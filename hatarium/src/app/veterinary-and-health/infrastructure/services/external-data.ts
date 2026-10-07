import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, catchError, switchMap } from 'rxjs';
import { AppointmentAnimal } from '../../domain/model/appointment-animal.entity';
import { environment } from '../../../../environments/environment';

export interface AnimalDTO {
  id: string;
  earTag: string;
  name: string;
  breed: string;
  sex: string;
  weight: number;
  lotId: string;
  lotName?: string;
  photoUrl?: string;
}

export interface VaccineDTO {
  id?: string;
  animalId: string;
  veterinarianId: string;
  name: string;
  dose: string;
  doseUnit: string;
  laboratory: string;
  lotNumber: string;
  appliedAt: string;
  nextDoseAt: string;
  route: string;
  applicationSite: string;
  status: string;
  observations: string;
}

@Injectable({ providedIn: 'root' })
export class ExternalDataService {
  private http = inject(HttpClient);
  private baseUrl = environment.hatariumApiBaseUrl;

  /** Obtiene todos los animales de la Fake API */
  getAnimals(): Observable<AnimalDTO[]> {
    return forkJoin({
      animals: this.http.get<AnimalDTO[]>(`${this.baseUrl}/animals`),
      lots: this.http.get<any[]>(`${this.baseUrl}/lots`)
    }).pipe(
      map(({ animals, lots }) => {
        return animals.map(animal => {
          const lot = lots.find(l => l.id === animal.lotId);
          return {
            ...animal,
            lotName: lot ? lot.name : 'Sin Lote'
          };
        });
      }),
      catchError(() => of([]))
    );
  }

  /** Obtiene el detalle completo de un animal específico por su ID */
  getAnimalDetail(animalId: string): Observable<AnimalDTO> {
    return forkJoin({
      animal: this.http.get<AnimalDTO>(`${this.baseUrl}/animals/${animalId}`),
      lots: this.http.get<any[]>(`${this.baseUrl}/lots`)
    }).pipe(
      map(({ animal, lots }) => {
        const lot = lots.find(l => l.id === animal.lotId);
        return {
          ...animal,
          lotName: lot ? lot.name : 'Sin Lote'
        };
      }),
      catchError(() => {
        const tag = animalId.replace('anm-', '');
        return of({
          id: animalId,
          earTag: tag,
          name: `Animal #${tag}`,
          breed: 'Raza Bovino',
          sex: 'Hembra',
          weight: 400,
          lotId: 'lot-001',
          lotName: 'Lote General'
        });
      })
    );
  }

  /** Obtiene la lista de relaciones entre Citas y Animales */
  getAppointmentAnimals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointmentAnimals`).pipe(
      catchError(() => of([]))
    );
  }

  /** Registra la relación entre una Cita y un Animal en hatarium-db.json */
  createAppointmentAnimal(appointmentId: string, animalId: string): Observable<AppointmentAnimal> {
    const url = `${this.baseUrl}/appointmentAnimals`;
    return this.http.get<AppointmentAnimal[]>(url, { params: { appointmentId, animalId } }).pipe(
      switchMap(relations => {
        const existing = relations.find(item => item.appointmentId === appointmentId && item.animalId === animalId);
        return existing ? of(existing) : this.http.post<AppointmentAnimal>(url, { appointmentId, animalId });
      }),
    );
  }

  /** Obtener medicamentos */
  getMedications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/medications`);
  }

  /** Obtiene las vacunas aplicadas a un animal desde hatarium-db.json */
  getVaccinesByAnimal(animalId: string): Observable<VaccineDTO[]> {
    return this.http.get<VaccineDTO[]>(`${this.baseUrl}/vaccines?animalId=${animalId}`).pipe(
      catchError(() => of([]))
    );
  }

  /** Registra una nueva vacuna aplicada en hatarium-db.json */
  createVaccine(vaccine: VaccineDTO): Observable<VaccineDTO | null> {
    return this.http.post<VaccineDTO>(`${this.baseUrl}/vaccines`, vaccine).pipe(
      catchError(() => of(null))
    );
  }
}
