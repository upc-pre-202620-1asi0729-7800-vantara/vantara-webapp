import {Component, effect, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {IamStore} from '../../../application/iam.store';
import {RegistrationRole} from '../../../domain/model/registration-role';
import {AuthenticationLayout} from '../../components/authentication-layout/authentication-layout';

/** Collects the data required to create a role-specific Hatarium account. */
@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink, AuthenticationLayout],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  private readonly router = inject(Router);
  protected readonly store = inject(IamStore);
  protected readonly roles = RegistrationRole;
  protected readonly passwordVisible = signal(false);
  private readonly registrationRequested = signal(false);

  protected readonly form = new FormGroup({
    fullName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    organizationName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    role: new FormControl(RegistrationRole.Rancher, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/)
      ]
    }),
    acceptsTerms: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue]
    })
  });

  private readonly registrationCompleted = effect(() => {
    const account = this.store.pendingAccount();
    const requestedEmail = this.form.controls.email.value.trim().toLowerCase();
    if (!this.registrationRequested() || account?.email !== requestedEmail) return;

    this.registrationRequested.set(false);
    void this.router.navigate(['/iam/verify-email'], {
      queryParams: {email: account.email}
    });
  });

  protected submit(): void {
    if (this.form.invalid || this.store.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    const {email, password, role} = this.form.getRawValue();
    this.registrationRequested.set(true);
    this.store.registerAccount(email, password, role);
  }

  protected togglePasswordVisibility(): void {
    this.passwordVisible.update(value => !value);
  }
}
