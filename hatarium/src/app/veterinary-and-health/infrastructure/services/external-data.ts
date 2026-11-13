import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, catchError, switchMap } from 'rxjs';
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

export interface MedicationDTO {
  id: string;
  name: string;
  category: string;
  activeIngredient: string;
  presentation: string;
}

export interface VaccineDTO {
  id?: string;
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
}

interface RoleRecord {
  id: string;
  code: string;
}

interface AccountRecord {
  id: string;
  roleId: string;
}

interface UserRecord {
  id: string;
  accountId: string;
  fullName: string;
}

@Injectable({ providedIn: 'root' })
export class ExternalDataService {
  private http = inject(HttpClient);
  private baseUrl = environment.hatariumApiBaseUrl;

  getAnimals(): Observable<AnimalDTO[]> {
    return forkJoin({
      animals: this.http.get<AnimalDTO[]>(`${this.baseUrl}/animals`),
      lots: this.http.get<{ id: string; name: string }[]>(`${this.baseUrl}/lots`)
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

  getAnimalDetail(animalId: string): Observable<AnimalDTO> {
    return forkJoin({
      animal: this.http.get<AnimalDTO>(`${this.baseUrl}/animals/${animalId}`),
      lots: this.http.get<{ id: string; name: string }[]>(`${this.baseUrl}/lots`)
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
          rancherId: '',
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

  getAppointmentAnimals(): Observable<AppointmentAnimal[]> {
    return this.http.get<AppointmentAnimal[]>(`${this.baseUrl}/appointmentAnimals`).pipe(
      catchError(() => of([]))
    );
  }

  createAppointmentAnimal(appointmentId: string, animalId: string): Observable<AppointmentAnimal> {
    const url = `${this.baseUrl}/appointmentAnimals`;
    return this.http.get<AppointmentAnimal[]>(url, { params: { appointmentId, animalId } }).pipe(
      switchMap(relations => {
        const existing = relations.find(item => item.appointmentId === appointmentId && item.animalId === animalId);
        return existing ? of(existing) : this.http.post<AppointmentAnimal>(url, { appointmentId, animalId });
      }),
    );
  }

  getMedications(): Observable<MedicationDTO[]> {
    return this.http.get<MedicationDTO[]>(`${this.baseUrl}/medications`).pipe(
      catchError(() => of([]))
    );
  }

  getVaccines(): Observable<VaccineDTO[]> {
    return this.http.get<VaccineDTO[]>(`${this.baseUrl}/vaccines`).pipe(
      catchError(() => of([]))
    );
  }

  getVaccinesByAnimal(animalId: string): Observable<VaccineDTO[]> {
    return this.http.get<VaccineDTO[]>(`${this.baseUrl}/vaccines`, { params: { animalId } }).pipe(
      catchError(() => of([]))
    );
  }

  createVaccine(vaccine: VaccineDTO): Observable<VaccineDTO> {
    return this.http.post<VaccineDTO>(`${this.baseUrl}/vaccines`, vaccine);
  }

  getUsers(): Observable<UserRecord[]> {
    return this.http.get<UserRecord[]>(`${this.baseUrl}/users`).pipe(
      catchError(() => of([]))
    );
  }

  getVeterinarians(): Observable<VeterinarianDTO[]> {
    return forkJoin({
      roles: this.http.get<RoleRecord[]>(`${this.baseUrl}/roles`),
      accounts: this.http.get<AccountRecord[]>(`${this.baseUrl}/accounts`),
      users: this.http.get<UserRecord[]>(`${this.baseUrl}/users`)
    }).pipe(
      map(({ roles, accounts, users }) => {
        const veterinarianRoleIds = new Set(
          roles.filter(role => role.code === 'VETERINARIAN').map(role => role.id)
        );
        const veterinarianAccountIds = new Set(
          accounts.filter(account => veterinarianRoleIds.has(account.roleId)).map(account => account.id)
        );
        return users
          .filter(user => veterinarianAccountIds.has(user.accountId))
          .map(user => ({ id: user.id, accountId: user.accountId, fullName: user.fullName }));
      }),
      catchError(() => of([]))
    );
  }
}
