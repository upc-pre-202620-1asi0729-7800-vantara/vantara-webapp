import { Service, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ReproductiveApi } from '../infrastructure/reproductive-api';
import { ReproductiveStore } from './reproductive.store';
import { LivestockApi } from '../../livestock-management/infrastructure/livestock-api';
import { LivestockStore } from '../../livestock-management/application/livestock-store';

/** Saves the weaning in both the birth history and the calf inventory record. */
@Service()
export class RegisterWeaning {
  private readonly reproductiveApi = inject(ReproductiveApi);
  private readonly reproductiveStore = inject(ReproductiveStore);
  private readonly livestockApi = inject(LivestockApi);
  private readonly livestockStore = inject(LivestockStore);

  async save(id: string, on: string, kg?: string | null): Promise<void> {
    const pregnancy = await firstValueFrom(this.reproductiveApi.getPregnancy(id));
    if (!pregnancy.endedOn || pregnancy.weanedOn || !pregnancy.calfId) {
      throw new Error('Selecciona un parto con una cría pendiente de destete.');
    }
    const date = new Date(`${on}T00:00:00`);
    if (Number.isNaN(date.getTime()) || date > new Date() || on < pregnancy.endedOn) {
      throw new Error('El destete debe ser posterior al parto y no puede estar en el futuro.');
    }
    const weight = kg ? Number(kg) : undefined;
    if (weight !== undefined && (!Number.isFinite(weight) || weight <= 0)) {
      throw new Error('El peso al destete debe ser mayor que cero.');
    }
    const calf = await firstValueFrom(this.livestockApi.getAnimalById(pregnancy.calfId));
    if (calf.motherId !== pregnancy.animalId || calf.weanedOn || calf.status !== 'active') {
      throw new Error('La cría no está vinculada a esta madre, ya fue destetada o no está activa.');
    }
    await firstValueFrom(this.reproductiveApi.recordWeaning(id, on, kg));
    const updated = await firstValueFrom(this.livestockApi.getAnimalById(calf.id));
    this.livestockStore.rememberAnimal(updated);
    this.reproductiveStore.loadHistory();
    this.reproductiveStore.loadSummary();
  }
}
