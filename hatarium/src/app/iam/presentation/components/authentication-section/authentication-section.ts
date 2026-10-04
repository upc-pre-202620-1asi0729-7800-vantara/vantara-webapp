import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {IamStore} from '../../../application/iam.store';

/** Minimal authentication actions for the application shell. */
@Component({
  selector: 'app-authentication-section',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './authentication-section.html',
  styleUrl: './authentication-section.css'
})
export class AuthenticationSection {
  protected readonly store = inject(IamStore);

  protected signOut(): void {
    this.store.signOut();
  }
}
