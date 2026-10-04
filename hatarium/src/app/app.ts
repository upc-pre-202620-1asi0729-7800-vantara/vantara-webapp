import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProfileView} from './profile/presentation/profile-view/profile-view';

@Component({
  imports: [RouterOutlet, ProfileView],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('hatarium');
}
