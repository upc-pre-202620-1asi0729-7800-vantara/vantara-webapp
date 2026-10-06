import {Component, effect, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {IamStore} from '../../../application/iam.store';
import {AuthenticationLayout} from '../../components/authentication-layout/authentication-layout';

/** Confirms ownership of the email used during account registration. */
@Component({
  selector: 'app-verify-email',
  imports: [ReactiveFormsModule, RouterLink, AuthenticationLayout, TranslatePipe],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css'
})
export class VerifyEmail {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly store = inject(IamStore);
  private readonly verificationRequested = signal(false);

  protected readonly form = new FormGroup({
    email: new FormControl(this.route.snapshot.queryParamMap.get('email') ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{6}$/)]
    })
  });

  private readonly verificationCompleted = effect(() => {
    const account = this.store.pendingAccount();
    const requestedEmail = this.form.controls.email.value.trim().toLowerCase();
    if (!this.verificationRequested() || !account?.emailVerified || account.email !== requestedEmail) return;

    this.verificationRequested.set(false);
    void this.router.navigate(['/iam/sign-in']);
  });

  protected submit(): void {
    if (this.form.invalid || this.store.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    const {email, code} = this.form.getRawValue();
    this.verificationRequested.set(true);
    this.store.verifyEmail(email, code);
  }
}
