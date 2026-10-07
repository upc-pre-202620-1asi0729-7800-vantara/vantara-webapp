/** Minimal animal resource required to calculate the reproductive summary. */
export interface ReproductiveAnimalResource {
  id: string;
  earTag: string;
  name: string;
  breed: string;
  sex: string;
  status: string;
  birthDate?: string;
  motherId?: string | null;
  weanedOn?: string | null;
}

/** Minimal medical record resource required to identify follow-up animals. */
export interface ReproductiveMedicalRecordResource {
  animalId: string;
  healthStatus: string;
}
