import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * View with the available subscription plans.
 */
@Component({
  selector: 'app-plans-view',
  imports: [RouterLink, MatButtonModule, MatCardModule, TranslatePipe],
  templateUrl: './plans-view.html',
  styleUrl: './plans-view.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class PlansView {
  readonly plans = [
    { name: 'Básico', price: 'S/ 29.90', animals: 'Hasta 50 animales' },
    { name: 'Profesional', price: 'S/ 49.90', animals: 'Hasta 200 animales' },
    { name: 'Premium', price: 'S/ 89.90', animals: 'Animales ilimitados' }
  ];
}
