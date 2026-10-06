import {Component, input} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

/** Shared split-screen shell used by the public IAM views. */
@Component({
  selector: 'app-authentication-layout',
  imports: [TranslatePipe],
  templateUrl: './authentication-layout.html',
  styleUrl: './authentication-layout.css'
})
export class AuthenticationLayout {
  readonly heroImage = input.required<string>();
  protected readonly currentYear = new Date().getFullYear();
}
