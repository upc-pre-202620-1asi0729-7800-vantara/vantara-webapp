import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimalList } from './livestock-management/presentation/components/animal-list/animal-list';
import { AnimalAdd } from './livestock-management/presentation/components/animal-add/animal-add';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnimalList, AnimalAdd],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
