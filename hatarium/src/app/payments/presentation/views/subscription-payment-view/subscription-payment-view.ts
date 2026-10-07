import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PaymentService } from '../../../application/payment.service';

interface Plan {
  id: string;
  name: string;
  price: string;
  desc: string;
  popular: boolean;
  badge?: string;
  icon: string;
  features: string[];
}

/**
 * Premium standalone subscription and payment view for Hatarium / Vantara.
 */
@Component({
  selector: 'app-subscription-payment-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './subscription-payment-view.html',
  styleUrl: './subscription-payment-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionPaymentView {
  private fb = inject(FormBuilder);
  private service = inject(PaymentService);
  private router = inject(Router);

  readonly plans: Plan[] = [
    {
      id: 'basico',
      name: 'Básico',
      price: '29.90',
      desc: 'Ideal para pequeños productores y hatos iniciales',
      popular: false,
      icon: 'eco',
      features: [
        'Hasta 50 animales registrados',
        'Registro de historial sanitario',
        'Control de alimentación básico',
        'Reportes pecuarios generales',
        'Soporte técnico por correo'
      ]
    },
    {
      id: 'profesional',
      name: 'Profesional',
      price: '49.90',
      desc: 'Para un control completo y productivo de tu ganadería',
      popular: true,
      badge: 'MÁS POPULAR',
      icon: 'workspace_premium',
      features: [
        'Hasta 200 animales registrados',
        'Historial sanitario y diagnóstico clínico',
        'Planes de alimentación avanzados',
        'Reportes detallados y exportación',
        'Gestión inteligente de lotes',
        'Citas técnicas y recordatorios',
        'Soporte prioritario 24/7'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '89.90',
      desc: 'Toda la potencia tecnológica para ganaderías de alta escala',
      popular: false,
      badge: 'EMPRESARIAL',
      icon: 'diamond',
      features: [
        'Animales y lotes ilimitados',
        'Todas las funcionalidades del sistema',
        'Análisis predictivo y reportes avanzados',
        'Exportación de datos (PDF / Excel)',
        'Integración con telemetría y dispositivos RFID',
        'Soporte dedicado y gestor de cuenta',
        'Capacitación personalizada para tu equipo'
      ]
    }
  ];

  selectedPlan: Plan = this.plans[1];

  form = this.fb.group({
    cardNumber: ['', [Validators.required, Validators.minLength(16)]],
    cardHolder: ['', [Validators.required]],
    expiry: ['', [Validators.required]],
    cvv: ['', [Validators.required, Validators.minLength(3)]]
  });

  selectPlan(plan: Plan): void {
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

  get formattedCardNumber(): string {
    const val = this.form.get('cardNumber')?.value;
    return val && val.trim().length > 0 ? val : '•••• •••• •••• ••••';
  }

  get cardHolderName(): string {
    const val = this.form.get('cardHolder')?.value;
    return val && val.trim().length > 0 ? val.toUpperCase() : 'JUAN QUISPE';
  }

  get cardExpiry(): string {
    const val = this.form.get('expiry')?.value;
    return val && val.trim().length > 0 ? val : 'MM/AA';
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
