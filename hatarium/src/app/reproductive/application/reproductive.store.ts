import { Service, computed, inject, signal } from '@angular/core';
import { Pregnancy } from '../domain/model/pregnancy.entity';
import { ReproductiveApi } from '../infrastructure/reproductive-api';
import { PregnancyDraft } from './pregnancy-draft';
import { EMPTY_REPRODUCTIVE_SUMMARY, ReproductiveSummary } from './reproductive-summary';

/**
 * Application store that coordinates pregnancy state for presentation components.
 */
@Service()
export class ReproductiveStore {
  private pregnanciesSignal = signal<Pregnancy[]>([]);
  private selectedAnimalIdSignal = signal<string | null>(null);
  private loadingSignal = signal<boolean>(false);
  private errorMessageSignal = signal<string | null>(null);
  private summarySignal = signal<ReproductiveSummary>(EMPTY_REPRODUCTIVE_SUMMARY);
  private summaryLoadingSignal = signal<boolean>(false);
  private summaryErrorSignal = signal<string | null>(null);
  private reproductiveApi = inject(ReproductiveApi);

  /** Read-only projection of the pregnancies list. */
  readonly pregnancies = computed(() => this.pregnanciesSignal());
  /** Read-only projection of the selected animal id. */
  readonly selectedAnimalId = computed(() => this.selectedAnimalIdSignal());
  /** Read-only projection of the loading flag. */
  readonly loading = computed(() => this.loadingSignal());
  /** Read-only projection of the current error message. */
  readonly errorMessage = computed(() => this.errorMessageSignal());
  /** Dashboard metrics calculated from animals, pregnancies and medical records. */
  readonly summary = computed(() => this.summarySignal());
  /** Whether the dashboard summary is currently loading. */
  readonly summaryLoading = computed(() => this.summaryLoadingSignal());
  /** Error produced while loading the dashboard summary. */
  readonly summaryError = computed(() => this.summaryErrorSignal());

  /** Loads the four summary cards displayed on the reproductive dashboard. */
  loadSummary(): void {
    this.summaryLoadingSignal.set(true);
    this.summaryErrorSignal.set(null);
    this.reproductiveApi.getSummary().subscribe({
      next: (summary) => {
        this.summarySignal.set(summary);
        this.summaryLoadingSignal.set(false);
      },
      error: () => {
        this.summaryErrorSignal.set('No se pudo cargar el resumen reproductivo.');
        this.summaryLoadingSignal.set(false);
      },
    });
  }

  /**
   * Loads the pregnancy history, optionally filtered by animal.
   */
  loadHistory(animalId?: string): void {
    this.loadingSignal.set(true);
    this.errorMessageSignal.set(null);
    this.reproductiveApi.getHistory(animalId).subscribe({
      next: (pregnancies) => {
        this.pregnanciesSignal.set(pregnancies);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorMessageSignal.set('No se pudo cargar el historial reproductivo.');
        this.loadingSignal.set(false);
      },
    });
  }

  /**
   * Confirms a pregnancy and refreshes the list.
   */
  confirm(draft: PregnancyDraft): void {
    this.reproductiveApi.confirm(draft).subscribe({
      next: (pregnancy) => {
        this.pregnanciesSignal.update((list) => [...list, pregnancy]);
      },
      error: () => this.errorMessageSignal.set('No se pudo confirmar la preñez.'),
    });
  }

  /**
   * Records the calving result and refreshes the local entry.
   */
  recordCalving(id: string, on: string, outcome: string): void {
    this.reproductiveApi.recordCalving(id, on, outcome).subscribe({
      next: (updated) => this.replacePregnancy(updated),
      error: () => this.errorMessageSignal.set('No se pudo registrar el parto.'),
    });
  }

  /**
   * Records the dry-off date and refreshes the local entry.
   */
  recordDryOff(id: string, on: string): void {
    this.reproductiveApi.recordDryOff(id, on).subscribe({
      next: (updated) => this.replacePregnancy(updated),
      error: () => this.errorMessageSignal.set('No se pudo registrar el secado.'),
    });
  }

  /**
   * Records the weaning data and refreshes the local entry.
   */
  recordWeaning(id: string, on: string, kg?: string | null): void {
    this.reproductiveApi.recordWeaning(id, on, kg).subscribe({
      next: (updated) => this.replacePregnancy(updated),
      error: () => this.errorMessageSignal.set('No se pudo registrar el destete.'),
    });
  }

  private replacePregnancy(value: Pregnancy): void {
    this.pregnanciesSignal.update((list) => list.map((p) => (p.id === value.id ? value : p)));
  }
}
