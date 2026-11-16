import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pregnancy } from '../domain/model/pregnancy.entity';
import { PregnancyResource } from './pregnancies-response';
import { PregnancyAssembler } from './pregnancy-assembler';
import { PregnancyDraft } from '../application/pregnancy-draft';
import { isCalf } from '../../shared/domain/model/animal-age';
import { RecentReproductiveEvent, ReproductiveSummary } from '../application/reproductive-summary';
import {
  ReproductiveAnimalResource,
  ReproductiveMedicalRecordResource,
} from './reproductive-summary-response';

/**
 * Infrastructure gateway to the Hatarium pregnancies API.
 */
@Service()
export class ReproductiveApi {
  private readonly baseUrl = environment.vantaraBackendBaseUrl;
  private readonly pregnanciesEndpoint = '/reproductive-records';
  private readonly animalsEndpoint = '/animals';
  private readonly medicalRecordsEndpoint = '/medicalRecords';
  private http = inject(HttpClient);
  private pregnancyAssembler = inject(PregnancyAssembler);

  getAnimals(): Observable<ReproductiveAnimalResource[]> {
    return this.http.get<ReproductiveAnimalResource[]>(`${this.baseUrl}${this.animalsEndpoint}`);
  }

  getPregnancy(id: string): Observable<Pregnancy> {
    return this.http.get<PregnancyResource>(`${this.baseUrl}${this.pregnanciesEndpoint}/${Number(id)}`)
      .pipe(map(resource => this.pregnancyAssembler.toEntityFromResource(resource)));
  }

  /**
   * Retrieves the pregnancy history, optionally filtered by animal.
   */
  getHistory(animalId?: string): Observable<Pregnancy[]> {
    const options = animalId ? { params: { animalId } } : {};
    return this.http
      .get<PregnancyResource[]>(`${this.baseUrl}${this.pregnanciesEndpoint}`, options)
      .pipe(map((resources) => this.pregnancyAssembler.toEntitiesFromResponse(resources)));
  }

  /**
   * Loads and aggregates the data required by the reproductive dashboard cards.
   */
  getSummary(): Observable<ReproductiveSummary> {
    return forkJoin({
      animals: this.http.get<ReproductiveAnimalResource[]>(
        `${this.baseUrl}${this.animalsEndpoint}`,
      ),
      pregnancies: this.http.get<PregnancyResource[]>(`${this.baseUrl}${this.pregnanciesEndpoint}`),
      medicalRecords: this.http.get<ReproductiveMedicalRecordResource[]>(
        `${this.baseUrl}${this.medicalRecordsEndpoint}`,
      ),
    }).pipe(
      map(({ animals, pregnancies, medicalRecords }) => {
        const activeAnimals = animals.filter((animal) => animal.status === 'active');
        const reproductiveFemales = activeAnimals.filter(
          (animal) => animal.sex.toLocaleLowerCase() === 'hembra' && !isCalf(animal.birthDate),
        );
        const reproductiveFemaleIds = new Set(reproductiveFemales.map((animal) => animal.id));
        const activePregnancyRecords = pregnancies.filter(
          (pregnancy) =>
            reproductiveFemaleIds.has(pregnancy.animalId) &&
            pregnancy.calvedOn == null &&
            pregnancy.status !== 'weaned',
        );
        // Count each female once, even when duplicate pregnancy records exist.
        const activePregnancies = [...new Map(
          [...activePregnancyRecords]
            .sort((first, second) => first.confirmedOn.localeCompare(second.confirmedOn))
            .map(pregnancy => [pregnancy.animalId, pregnancy]),
        ).values()];

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const twoMonthsFromToday = new Date(today);
        twoMonthsFromToday.setMonth(twoMonthsFromToday.getMonth() + 2);

        const upcomingCalvings = activePregnancies.filter((pregnancy) => {
          if (!pregnancy.expectedCalvingOn) return false;
          const expectedCalvingOn = new Date(`${pregnancy.expectedCalvingOn}T00:00:00`);
          return expectedCalvingOn >= today && expectedCalvingOn <= twoMonthsFromToday;
        }).length;

        const followUpFemaleIds = new Set(
          medicalRecords
            .filter(
              (record) =>
                record.healthStatus === 'follow_up' && reproductiveFemaleIds.has(record.animalId),
            )
            .map((record) => record.animalId),
        );
        const reproductiveIssueIds = new Set(
          [...followUpFemaleIds].filter(
            (animalId) => !activePregnancies.some((pregnancy) => pregnancy.animalId === animalId),
          ),
        );
        const pregnantFemaleIds = new Set(activePregnancies.map((pregnancy) => pregnancy.animalId));
        const vacantFemales = reproductiveFemales.filter(
          (animal) => !pregnantFemaleIds.has(animal.id) && !reproductiveIssueIds.has(animal.id),
        ).length;
        const animalsById = new Map(reproductiveFemales.map((animal) => [animal.id, animal]));
        const upcomingEvents = activePregnancies
          .filter((pregnancy) => {
            if (!pregnancy.expectedCalvingOn) return false;
            return new Date(`${pregnancy.expectedCalvingOn}T00:00:00`) >= today;
          })
          .map((pregnancy) => {
            const animal = animalsById.get(pregnancy.animalId);
            return {
              id: `calving-${pregnancy.id}`,
              type: 'calving' as const,
              animalLabel: animal ? `${animal.name} · #${animal.earTag}` : `#${pregnancy.animalId}`,
              animalBreed: animal?.breed ?? '',
              scheduledOn: pregnancy.expectedCalvingOn!,
            };
          })
          .sort((first, second) => first.scheduledOn.localeCompare(second.scheduledOn));
        const recentEvents: RecentReproductiveEvent[] = [];

        pregnancies
          .filter((pregnancy) => reproductiveFemaleIds.has(pregnancy.animalId))
          .forEach((pregnancy) => {
            const animal = animalsById.get(pregnancy.animalId);
            const eventAnimal = {
              animalLabel: animal ? `${animal.name} · #${animal.earTag}` : `#${pregnancy.animalId}`,
              animalBreed: animal?.breed ?? '',
            };

            if (pregnancy.confirmedOn) {
              recentEvents.push({
                id: `pregnancy-${pregnancy.id}`,
                type: 'pregnancy',
                occurredOn: pregnancy.confirmedOn,
                status: 'confirmed',
                ...eventAnimal,
              });
            }
            if (pregnancy.calvedOn) {
              recentEvents.push({
                id: `calving-${pregnancy.id}`,
                type: 'calving',
                occurredOn: pregnancy.calvedOn,
                status: 'completed',
                ...eventAnimal,
              });
            }
            if (pregnancy.dryOffOn) {
              recentEvents.push({
                id: `dry-off-${pregnancy.id}`,
                type: 'dryOff',
                occurredOn: pregnancy.dryOffOn,
                status: 'registered',
                ...eventAnimal,
              });
            }
            if (pregnancy.weanedOn) {
              recentEvents.push({
                id: `weaning-${pregnancy.id}`,
                type: 'weaning',
                occurredOn: pregnancy.weanedOn,
                status: 'completed',
                ...eventAnimal,
              });
            }
          });

        recentEvents.sort((first, second) => second.occurredOn.localeCompare(first.occurredOn));

        return {
          reproductiveFemales: reproductiveFemales.length,
          calfCount: activeAnimals.filter(animal => isCalf(animal.birthDate)).length,
          reproductiveFemalePercentage: this.percentage(
            reproductiveFemales.length,
            activeAnimals.length,
          ),
          pregnantFemales: activePregnancies.length,
          pregnantPercentage: this.percentage(activePregnancies.length, reproductiveFemales.length),
          upcomingCalvings,
          followUpRequired: followUpFemaleIds.size,
          statusDistribution: {
            pregnant: pregnantFemaleIds.size,
            vacant: vacantFemales,
            inHeat: 0,
            issues: reproductiveIssueIds.size,
          },
          upcomingEvents,
          recentEvents,
        };
      }),
    );
  }

  /**
   * Confirms a new pregnancy from a draft.
   */
  confirm(draft: PregnancyDraft): Observable<Pregnancy> {
    const payload = {
      animalId: draft.animalId,
      confirmedOn: draft.confirmedOn,
      expectedCalvingOn: draft.expectedCalvingOn ?? null,
    };
    return this.http
      .post<PregnancyResource>(`${this.baseUrl}${this.pregnanciesEndpoint}`, payload)
      .pipe(map((resource) => this.pregnancyAssembler.toEntityFromResource(resource)));
  }

  /**
   * Records the calving result of a pregnancy.
   */
  recordCalving(id: string, on: string, outcome: string, calf?: { name: string; earTag: string; sex: string; weight: number }): Observable<Pregnancy> {
    return this.http
      .post<PregnancyResource>(`${this.baseUrl}${this.pregnanciesEndpoint}/${Number(id)}/calvings`, {
        calvedOn: on,
        outcome,
        ...(calf ? { calf: { name: calf.name, earTag: calf.earTag, sex: calf.sex, weightKg: calf.weight } } : {}),
      })
      .pipe(map((resource) => this.pregnancyAssembler.toEntityFromResource(resource)));
  }

  /**
   * Records the dry-off date of a pregnancy.
   */
  recordDryOff(id: string, on: string): Observable<Pregnancy> {
    return this.http
      .post<PregnancyResource>(`${this.baseUrl}${this.pregnanciesEndpoint}/${Number(id)}/dry-offs`, { dryOffOn: on })
      .pipe(map((resource) => this.pregnancyAssembler.toEntityFromResource(resource)));
  }

  /**
   * Records the weaning data of a pregnancy.
   */
  recordWeaning(id: string, on: string, kg?: string | null): Observable<Pregnancy> {
    return this.http
      .post<PregnancyResource>(`${this.baseUrl}${this.pregnanciesEndpoint}/${Number(id)}/weanings`, { weanedOn: on, weaningWeightKg: kg ? Number(kg) : null })
      .pipe(map((resource) => this.pregnancyAssembler.toEntityFromResource(resource)));
  }

  private percentage(value: number, total: number): number {
    return total === 0 ? 0 : Math.round((value / total) * 1000) / 10;
  }
}
