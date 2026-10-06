import {Component, effect, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {IamStore} from '../../../application/iam.store';
import {AuthenticationLayout} from '../../components/authentication-layout/authentication-layout';

/** Collects the credentials used to access an existing Hatarium account. */
@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink, AuthenticationLayout, TranslatePipe],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {
  protected readonly store = inject(IamStore);
  protected readonly passwordVisible = signal(false);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      if (this.store.currentAccount()) {
        void this.router.navigateByUrl('/suscripcion');
      }
    });
  }

  protected readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true
    }),
    rememberMe: new FormControl(false, {nonNullable: true})
  });

  protected submit(): void {
    if (this.form.invalid || this.store.loading()) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.signIn(this.form.controls.email.value, this.form.controls.password.value);
  }

  protected togglePasswordVisibility(): void {
    this.passwordVisible.update(value => !value);
  }
}
