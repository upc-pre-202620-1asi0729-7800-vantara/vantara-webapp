import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaymentService } from '../../../application/payment.service';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Standalone view to pay for a subscription the first time.
 */
@Component({
  selector: 'app-subscription-payment-view',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, TranslatePipe],
  templateUrl: './subscription-payment-view.html',
  styleUrl: './subscription-payment-view.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class SubscriptionPaymentView {
  private fb = inject(FormBuilder);
  private service = inject(PaymentService);
  private router = inject(Router);

  readonly plans = [
    { id: 'basico', name: 'Básico', price: '29.90', desc: 'Ideal para pequeños productores', popular: false, features: ['Hasta 50 animales', 'Registro de historial sanitario', 'Control de alimentación básico', 'Reportes generales', 'Soporte por correo'] },
    { id: 'profesional', name: 'Profesional', price: '49.90', desc: 'Para un control completo de tu ganadería', popular: true, features: ['Hasta 200 animales', 'Historial sanitario completo', 'Planes de alimentación avanzados', 'Reportes detallados y exportación', 'Gestión de lotes', 'Citas y recordatorios', 'Soporte prioritario'] },
    { id: 'premium', name: 'Premium', price: '89.90', desc: 'Todas las funcionalidades', popular: false, features: ['Animales ilimitados', 'Todas las funcionalidades', 'Análisis y reportes avanzados', 'Exportación de datos (PDF/Excel)', 'Integración con dispositivos RFID', 'Soporte dedicado', 'Capacitación personalizada'] }
  ];

  selectedPlan = this.plans[1];

  form = this.fb.group({
    cardNumber: ['', Validators.required],
    cardHolder: ['', Validators.required],
    expiry: ['', Validators.required],
    cvv: ['', Validators.required]
  });

  selectPlan(plan: (typeof this.plans)[number]): void {
    this.selectedPlan = plan;
  }

  generateRandomData(): void {
    const digits = Array.from({ length: 4 }, () => Math.floor(1000 + Math.random() * 9000)).join(' ');
    const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    const year = String(28 + Math.floor(Math.random() * 6));
    this.form.setValue({
      cardNumber: digits,
      cardHolder: 'Juan Quispe',
      expiry: `${month}/${year}`,
      cvv: String(100 + Math.floor(Math.random() * 900))
    });
  }

  pay(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.service.create({
      rancherId: 'usr-002',
      concept: `Suscripción ${this.selectedPlan.name}`,
      amount: this.selectedPlan.price,
      currency: 'PEN'
    });
    this.router.navigateByUrl('/config/payments/success');
  }
}
