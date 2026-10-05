  import { Injectable, inject } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable, map } from 'rxjs';
  import { environment } from '../../../environments/environment';
  import { Pregnancy } from '../domain/model/pregnancy.entity';
  import { PregnancyResource } from './pregnancies-response';
  import { PregnancyAssembler } from './pregnancy-assembler';
  import { PregnancyDraft } from '../application/pregnancy-draft';

  /**
   * Infrastructure gateway to the Hatarium pregnancies API.
   */
  @Injectable({ providedIn: 'root' })
  export class ReproductiveApi {
    private baseUrl = `${environment.hatariumApiBaseUrl}${environment.hatariumPregnanciesEndpointPath}`;
    private http = inject(HttpClient);
    private pregnancyAssembler = inject(PregnancyAssembler);

    /**
     * Retrieves the pregnancy history, optionally filtered by animal.
     */
    getHistory(animalId?: string): Observable<Pregnancy[]> {
      const options = animalId ? { params: { animalId } } : {};
      return this.http.get<PregnancyResource[]>(this.baseUrl, options).pipe(
        map(resources => this.pregnancyAssembler.toEntitiesFromResponse(resources))
      );
    }

    /**
     * Confirms a new pregnancy from a draft.
     */
    confirm(draft: PregnancyDraft): Observable<Pregnancy> {
      const payload = {
        animalId: draft.animalId,
        calfId: draft.calfId ?? null,
        confirmedOn: draft.confirmedOn,
        expectedCalvingOn: draft.expectedCalvingOn ?? null,
        endedOn: null,
        outcome: null,
        birthWeightKg: null,
        dryOffOn: null,
        weanedOn: null,
        weaningWeightKg: null,
        status: 'confirmed',
        notes: null
      };
      return this.http.post<PregnancyResource>(this.baseUrl, payload).pipe(
        map(resource => this.pregnancyAssembler.toEntityFromResource(resource))
      );
    }

    /**
     * Records the calving result of a pregnancy.
     */
    recordCalving(id: string, on: string, outcome: string): Observable<Pregnancy> {
      return this.http.patch<PregnancyResource>(`${this.baseUrl}/${id}`, {
        endedOn: on,
        outcome,
        status: 'ended'
      }).pipe(
        map(resource => this.pregnancyAssembler.toEntityFromResource(resource))
      );
    }

    /**
     * Records the dry-off date of a pregnancy.
     */
    recordDryOff(id: string, on: string): Observable<Pregnancy> {
      return this.http.patch<PregnancyResource>(`${this.baseUrl}/${id}`, {
        dryOffOn: on,
        status: 'dry_off'
      }).pipe(
        map(resource => this.pregnancyAssembler.toEntityFromResource(resource))
      );
    }

    /**
     * Records the weaning data of a pregnancy.
     */
    recordWeaning(id: string, on: string, kg?: string | null): Observable<Pregnancy> {
      return this.http.patch<PregnancyResource>(`${this.baseUrl}/${id}`, {
        weanedOn: on,
        weaningWeightKg: kg ?? null,
        status: 'weaned'
      }).pipe(
        map(resource => this.pregnancyAssembler.toEntityFromResource(resource))
      );
    }
  }
