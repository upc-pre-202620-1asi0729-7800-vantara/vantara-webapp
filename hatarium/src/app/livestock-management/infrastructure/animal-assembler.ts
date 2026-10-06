import {Service} from '@angular/core';
import {Animal} from '../domain/model/animal.entity';
import {AnimalResource, AnimalsResponse} from './animals-response';

@Service()
export class AnimalAssembler {

  toEntityFromResource(resource: AnimalResource): Animal {
    let animal = new Animal();
    animal.id = resource.id;
    animal.rancherId = resource.rancherId;
    animal.lotId = resource.lotId;
    animal.earTag = resource.earTag;
    animal.name = resource.name;
    animal.species = resource.species;
    animal.breed = resource.breed;
    animal.sex = resource.sex;
    animal.birthDate = resource.birthDate;
    animal.motherId = resource.motherId;
    animal.fatherId = resource.fatherId;
    animal.weight = resource.weight;
    animal.status = resource.status;
    animal.registeredAt = resource.registeredAt;
    animal.photoUrl = resource.photoUrl;
    animal.weanedOn = resource.weanedOn ?? null;
    return animal;
  }

  toEntitiesFromResponse(response: AnimalsResponse): Animal[] {
    return response.animals.map((resource) => this.toEntityFromResource(resource));
  }


}
