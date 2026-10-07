import { DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { ReproductiveApi } from '../infrastructure/reproductive-api';
import { isCalf } from '../../shared/domain/model/animal-age';

export type ReproductiveEventType = 'pregnancy' | 'calving' | 'dry-off' | 'weaning';

/** Loads selectable animals and links existing events to their pregnancy record. */
export function reproductiveEventOptions(type: ReproductiveEventType) {
  const api = inject(ReproductiveApi);
  const destroyRef = inject(DestroyRef);
  const options = signal<{ value: string; label: string }[]>([]);
  const loading = signal(true);
  const error = signal<string | null>(null);

  forkJoin({ animals: api.getAnimals(), pregnancies: api.getHistory() })
    .pipe(takeUntilDestroyed(destroyRef))
    .subscribe({
      next: ({ animals, pregnancies }) => {
        const females = animals.filter(animal =>
          animal.status === 'active' && animal.sex.toLowerCase() === 'hembra' && !isCalf(animal.birthDate));
        if (type === 'pregnancy') {
          options.set(females.map(animal => ({
            value: animal.id,
            label: `${animal.name} · #${animal.earTag}`,
          })));
        } else {
          const byId = new Map(females.map(animal => [animal.id, animal]));
          const allById = new Map(animals.map(animal => [animal.id, animal]));
          options.set(pregnancies.filter(pregnancy =>
            byId.has(pregnancy.animalId) &&
            (type === 'weaning'
              ? !!pregnancy.endedOn && !pregnancy.weanedOn && pregnancy.status !== 'weaned' &&
                !!pregnancy.calfId && allById.get(pregnancy.calfId)?.motherId === pregnancy.animalId &&
                allById.get(pregnancy.calfId)?.status === 'active' && !allById.get(pregnancy.calfId)?.weanedOn
              : !pregnancy.endedOn && pregnancy.status !== 'weaned' &&
                (type !== 'dry-off' || !pregnancy.dryOffOn))
          ).map(pregnancy => {
            const animal = byId.get(pregnancy.animalId)!;
            const calf = pregnancy.calfId ? allById.get(pregnancy.calfId) : undefined;
            return {
              value: pregnancy.id,
              label: type === 'weaning' && calf
                ? `${animal.name} · Cría: ${calf.name} (#${calf.earTag})`
                : `${animal.name} · #${animal.earTag} · ${pregnancy.confirmedOn}`,
            };
          }));
        }
        loading.set(false);
      },
      error: () => {
        error.set('No se pudieron cargar los animales. Comprueba que el servidor esté disponible.');
        loading.set(false);
      },
    });

  return { options, loading, error };
}
