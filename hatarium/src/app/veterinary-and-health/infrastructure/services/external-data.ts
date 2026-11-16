
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  forkJoin,
  map,
  of,
  catchError,
  switchMap
} from 'rxjs';

import { AppointmentAnimal } from '../../domain/model/appointment-animal.entity';
import { environment } from '../../../../environments/environment';

export interface AnimalDTO {
  id: string;
  rancherId: string;
  earTag: string;
  name: string;
  breed: string;
  sex: string;
  weight: number;
  lotId: string;
  lotName?: string;
  photoUrl?: string;
}

export interface AccessibleAnimalDTO extends AnimalDTO {
  appointmentId: string;
}

export interface MedicationDTO {
  id: string;
  name: string;
  category: string;
  activeIngredient: string;
  presentation: string;
}

export interface VaccineDTO {
  id?: string;
  appointmentId: string;
  animalId: string;
  veterinarianId: string;
  vaccineType: string;
  name: string;
  dose: number;
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

export interface VeterinarianDTO {
  id: string;
  accountId: string;
  fullName: string;
  email?: string;
}

interface VeterinarianResource {
  id: number;
  fullName: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ExternalDataService {

  private http = inject(HttpClient);

  readonly veterinarianDirectoryStatus =
    signal<'idle' | 'loading' | 'ready' | 'error'>('idle');

  private backendUrl = environment.vantaraBackendBaseUrl;

  getAnimals(): Observable<AnimalDTO[]> {
    return forkJoin({
      animals: this.http.get<AnimalDTO[]>(
        `${this.backendUrl}/animals`
      ),
      lots: this.http.get<{ id: string; name: string }[]>(
        `${this.backendUrl}/lots`
      )
    }).pipe(
      map(({ animals, lots }) =>
        animals.map(animal => {
          const lot = lots.find(l => l.id === animal.lotId);

          return {
            ...animal,
            lotName: lot ? lot.name : 'Sin Lote'
          };
        })
      ),
      catchError(() => of([]))
    );
  }

  getAccessibleAnimals(): Observable<AccessibleAnimalDTO[]> {
    return this.http.get<AccessibleAnimalDTO[]>(
      `${this.backendUrl}/vaccines/accessible-animals`
    ).pipe(
      catchError(() => of([]))
    );
  }

  getAnimalDetail(animalId: string): Observable<AnimalDTO> {
    return forkJoin({
      animal: this.http.get<AnimalDTO>(
        `${this.backendUrl}/animals/${animalId}`
      ),
      lots: this.http.get<{ id: string; name: string }[]>(
        `${this.backendUrl}/lots`
      )
    }).pipe(
      map(({ animal, lots }) => {
        const lot = lots.find(l => l.id === animal.lotId);

        return {
          ...animal,
          lotName: lot ? lot.name : 'Sin Lote'
        };
      })
    );
  }

  getAppointmentAnimalDetail(
    appointmentId: string,
    animalId: string
  ): Observable<AnimalDTO> {
    return this.http.get<AnimalDTO>(
      `${this.backendUrl}/appointments/${appointmentId}/animals/${animalId}`
    );
  }

  getAppointmentAnimals(): Observable<AppointmentAnimal[]> {
    return this.http.get<AppointmentAnimal[]>(
      `${this.backendUrl}/appointmentAnimals`
    ).pipe(
      catchError(() => of([]))
    );
  }

  createAppointmentAnimal(
    appointmentId: string,
    animalId: string
  ): Observable<AppointmentAnimal> {

    const url = `${this.backendUrl}/appointmentAnimals`;

    return this.http.get<AppointmentAnimal[]>(url, {
      params: { appointmentId, animalId }
    }).pipe(
      switchMap(relations => {
        const existing = relations.find(
          item =>
            item.appointmentId === appointmentId &&
            item.animalId === animalId
        );

        return existing
          ? of(existing)
          : this.http.post<AppointmentAnimal>(
            url,
            { appointmentId, animalId }
          );
      })
    );
  }

  getMedications(): Observable<MedicationDTO[]> {
    return this.http.get<MedicationDTO[]>(
      `${this.backendUrl}/medications`
    ).pipe(
      catchError(() => of([]))
    );
  }

  getVaccines(): Observable<VaccineDTO[]> {
    return this.http.get<VaccineDTO[]>(
      `${this.backendUrl}/vaccines`
    ).pipe(
      map(list =>
        list.map(vaccine => ({
          ...vaccine,
          veterinarianId: String(vaccine.veterinarianId)
        }))
      ),
      catchError(() => of([]))
    );
  }

  getVaccinesByAnimal(animalId: string): Observable<VaccineDTO[]> {
    return this.http.get<VaccineDTO[]>(
      `${this.backendUrl}/vaccines`,
      { params: { animalId } }
    ).pipe(
      map(list =>
        list.map(vaccine => ({
          ...vaccine,
          veterinarianId: String(vaccine.veterinarianId)
        }))
      ),
      catchError(() => of([]))
    );
  }

  createVaccine(vaccine: VaccineDTO): Observable<VaccineDTO> {
    return this.http.post<VaccineDTO>(
      `${this.backendUrl}/vaccines`,
      {
        ...vaccine,
        veterinarianId: Number(vaccine.veterinarianId)
      }
    ).pipe(
      map(created => ({
        ...created,
        veterinarianId: String(created.veterinarianId)
      }))
    );
  }

  getVeterinarians(): Observable<VeterinarianDTO[]> {
    this.veterinarianDirectoryStatus.set('loading');

    return this.http.get<VeterinarianResource[]>(
      `${this.backendUrl}/veterinarians`
    ).pipe(
      map(veterinarians =>
        veterinarians.map(veterinarian => ({
          id: String(veterinarian.id),
          accountId: String(veterinarian.id),
          fullName: veterinarian.fullName,
          email: veterinarian.email
        }))
      ),
      map(veterinarians => {
        this.veterinarianDirectoryStatus.set('ready');
        return veterinarians;
      }),
      catchError(() => {
        this.veterinarianDirectoryStatus.set('error');
        return of([]);
      })
    );
  }
}
