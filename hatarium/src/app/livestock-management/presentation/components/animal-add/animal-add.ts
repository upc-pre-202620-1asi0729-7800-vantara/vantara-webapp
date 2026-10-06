import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatFormField, MatHint} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import {TranslatePipe} from '@ngx-translate/core';
import {LivestockStore} from '../../../application/livestock-store';
import {Router} from '@angular/router';
import {Animal} from '../../../domain/model/animal.entity';

@Component({
  selector: 'app-animal-add',
  imports: [
    FormsModule,
    MatCard,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatHint,
    TranslatePipe
  ],
  templateUrl: './animal-add.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './animal-add.css'
})
export class AnimalAdd {

  private livestockStore = inject(LivestockStore);
  private router = inject(Router);

  lots = this.livestockStore.lots;
  animals = this.livestockStore.animals;

  selectedLot = signal('');
  earTag = signal('');
  name = signal('');
  species = signal('');
  breed = signal('');
  sex = signal('');
  birthDate = signal('');
  weight = signal<number | null>(null);

  motherId = signal('');
  fatherId = signal('');

  photoUrl = signal('');

  constructor() {
    this.livestockStore.loadLots();
    this.livestockStore.loadAnimals();
  }

  mothers = computed(() =>
    this.animals().filter(animal => animal.sex === 'Hembra')
  );

  fathers = computed(() =>
    this.animals().filter(animal => animal.sex === 'Macho')
  );

  setLot(value: string) {
    this.selectedLot.set(value);
  }

  setEarTag(value: string) {
    this.earTag.set(value);
  }

  setName(value: string) {
    this.name.set(value);
  }

  setSpecies(value: string) {
    this.species.set(value);
  }

  setBreed(value: string) {
    this.breed.set(value);
  }

  setSex(value: string) {
    this.sex.set(value);
  }

  setBirthDate(value: string) {
    this.birthDate.set(value);
  }

  setWeight(value: string) {
    this.weight.set(value ? Number(value) : null);
  }

  setMother(value: string) {
    this.motherId.set(value);
  }

  setFather(value: string) {
    this.fatherId.set(value);
  }

  get selectedMotherName(): string {
    const mother = this.animals().find(
      animal => animal.id === this.motherId()
    );

    return mother?.name || 'No especificada';
  }

  get selectedFatherName(): string {
    const father = this.animals().find(
      animal => animal.id === this.fatherId()
    );

    return father?.name || 'No especificado';
  }

  registerAnimal() {
    if (
      !this.selectedLot() ||
      !this.earTag() ||
      !this.name() ||
      !this.species() ||
      !this.breed() ||
      !this.sex() ||
      !this.birthDate() ||
      this.weight() === null
    ) {
      alert('Completa todos los campos obligatorios.');
      return;
    }

    const newAnimal = new Animal();

    newAnimal.id = `anm-${this.earTag()}`;
    newAnimal.rancherId = 'usr-002';
    newAnimal.lotId = this.selectedLot();
    newAnimal.earTag = this.earTag();
    newAnimal.name = this.name();
    newAnimal.species = this.species();
    newAnimal.breed = this.breed();
    newAnimal.sex = this.sex();
    newAnimal.birthDate = this.birthDate();
    newAnimal.motherId = this.motherId() || null;
    newAnimal.fatherId = this.fatherId() || null;
    newAnimal.weight = this.weight()!;
    newAnimal.status = 'active';
    newAnimal.registeredAt = new Date().toISOString().split('T')[0];
    newAnimal.photoUrl = this.photoUrl();
    this.livestockStore.createAnimal(newAnimal);
    this.router.navigate(['/livestock/animals']);

  }
  cancel() {
    this.router.navigate(['/livestock/animals']);
  }

  volverGanado() {
    this.router.navigate(['/livestock/animals']);
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Selecciona una imagen válida.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement('canvas');

        const maxWidth = 800;
        const maxHeight = 600;

        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');

        if (!context) {
          return;
        }

        context.drawImage(image, 0, 0, width, height);

        const compressedImage = canvas.toDataURL('image/jpeg', 0.7);

        this.photoUrl.set(compressedImage);
      };

      image.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}

