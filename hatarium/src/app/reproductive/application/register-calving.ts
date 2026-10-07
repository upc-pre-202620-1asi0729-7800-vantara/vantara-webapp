import { Service, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ReproductiveApi } from '../infrastructure/reproductive-api';
import { LivestockApi } from '../../livestock-management/infrastructure/livestock-api';
import { LivestockStore } from '../../livestock-management/application/livestock-store';
import { Animal } from '../../livestock-management/domain/model/animal.entity';
import { ReproductiveStore } from './reproductive.store';
import { ActivityNotifications } from '../../notifications/application/activity-notifications';

export interface CalvingDraft {
  pregnancyId: string;
  on: string;
  outcome: string;
  calf?: { name: string; earTag: string; sex: string; weight: number };
}

/** Coordinates a birth in reproduction and its calf in the livestock inventory. */
@Service()
export class RegisterCalving {
  private readonly reproductiveApi = inject(ReproductiveApi);
  private readonly livestockApi = inject(LivestockApi);
  private readonly livestockStore = inject(LivestockStore);
  private readonly reproductiveStore = inject(ReproductiveStore);
  private readonly notifications = inject(ActivityNotifications);

  async save(draft: CalvingDraft): Promise<void> {
    const pregnancy = await firstValueFrom(this.reproductiveApi.getPregnancy(draft.pregnancyId));
    if (pregnancy.endedOn || pregnancy.status === 'weaned') {
      throw new Error('Este parto ya fue registrado.');
    }
    const on = new Date(`${draft.on}T00:00:00`);
    if (Number.isNaN(on.getTime()) || on > new Date() || draft.on < pregnancy.confirmedOn) {
      throw new Error('La fecha del parto debe ser posterior a la confirmación y no puede estar en el futuro.');
    }
    if (!draft.outcome.trim()) throw new Error('Indica el resultado del parto.');

    const mother = await firstValueFrom(this.livestockApi.getAnimalById(pregnancy.animalId));
    if (mother.status !== 'active' || mother.sex !== 'Hembra' || mother.isCalf()) {
      throw new Error('No se encontró una madre activa apta para registrar el parto.');
    }
    let createdCalf: Animal | undefined;
    if (draft.calf) {
      const calf = draft.calf;
      if (!calf.name.trim() || !calf.earTag.trim() || !['Hembra', 'Macho'].includes(calf.sex) ||
          !Number.isFinite(calf.weight) || calf.weight <= 0) {
        throw new Error('Completa el nombre, arete, sexo y peso de la cría.');
      }
      const animals = await firstValueFrom(this.livestockApi.getAnimals());
      if (animals.some(animal => animal.earTag === calf.earTag.trim())) {
        throw new Error('El arete de la cría ya pertenece a otro animal.');
      }
      const animal = Object.assign(new Animal(), {
        id: `anm-birth-${pregnancy.id}`,
        rancherId: mother.rancherId,
        lotId: mother.lotId,
        species: mother.species,
        breed: mother.breed,
        name: calf.name.trim(),
        earTag: calf.earTag.trim(),
        sex: calf.sex,
        weight: calf.weight,
        birthDate: draft.on,
        motherId: mother.id,
        status: 'active',
        registeredAt: new Date().toISOString().slice(0, 10),
      });
      if (animals.some(existing => existing.id === animal.id)) {
        throw new Error('Ya existe una cría asociada a esta preñez. Revisa el inventario antes de registrar otro parto.');
      }
      createdCalf = await firstValueFrom(this.livestockApi.createAnimal(animal));
    }

    try {
      await firstValueFrom(this.reproductiveApi.recordCalving(
        pregnancy.id, draft.on, draft.outcome.trim(), createdCalf,
      ));
    } catch (error) {
      if (createdCalf) {
        try {
          await firstValueFrom(this.livestockApi.deleteAnimal(createdCalf.id));
        } catch {
          this.livestockStore.rememberAnimal(createdCalf);
          throw new Error('La cría se guardó, pero no se pudo guardar el parto ni revertir la creación. Revisa el inventario antes de volver a intentar.');
        }
      }
      throw error;
    }
    if (createdCalf) this.livestockStore.rememberAnimal(createdCalf);
    this.reproductiveStore.loadHistory();
    this.reproductiveStore.loadSummary();
    await firstValueFrom(this.notifications.publish({
      recipientUserId: mother.rancherId, type: 'CALVING_REGISTERED', title: 'Parto registrado',
      description: `Se registró el parto de ${mother.name} el ${draft.on}${createdCalf ? `. Nueva cría: ${createdCalf.name} (#${createdCalf.earTag})` : ''}.`,
      relatedEntityType: 'Pregnancy', relatedEntityId: pregnancy.id,
    }));
    if (createdCalf) {
      await firstValueFrom(this.notifications.publish({
        recipientUserId: createdCalf.rancherId, type: 'ANIMAL_REGISTERED', title: 'Nueva cría registrada',
        description: `${createdCalf.name} (#${createdCalf.earTag}) se agregó al ganado. Madre: ${mother.name}.`,
        relatedEntityType: 'Animal', relatedEntityId: createdCalf.id,
      }));
    }
  }
}
