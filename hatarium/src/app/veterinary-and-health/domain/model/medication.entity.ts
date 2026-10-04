export class Medication {
  /** Identificador único del medicamento. */
  id: string;
  /** Nombre comercial del medicamento. */
  name: string;
  /** Categoría del medicamento. */
  category: string;
  /** Principio activo. */
  activeIngredient: string;
  /** Presentación del producto. */
  presentation: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.category = '';
    this.activeIngredient = '';
    this.presentation = '';
  }

}
