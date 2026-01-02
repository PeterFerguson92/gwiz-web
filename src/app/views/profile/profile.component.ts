import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { loadStripe, Stripe, StripeElements, StripePaymentElement } from '@stripe/stripe-js';

import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { SHARED_IMPORTS } from '@/app/shared/shared-imports';
import { environment } from '@/environments/environment';
import { Membership } from '@core/models/membership.models';
import { AssetService } from '@core/services/asset.service';
import { MembershipService } from '@core/services/membership.service';
import { ToastService } from '@core/services/toast.service';
import { MyBookingsComponent } from '@views/my-bookings/my-bookings.component';
import { MyTicketsComponent } from '@views/my-tickets/my-tickets.component';

import { UserProfile } from '../../core/models/auth.models';
import { AuthService } from '../../core/services/auth.service';

const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeroComponent,
    ...SHARED_IMPORTS,
    MyBookingsComponent,
    MyTicketsComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  activeTab: 'profile' | 'bookings' | 'tickets' | 'membership' = 'profile';

  heroImage = 'assets/img/bg/profile-bg.jpg';

  plans: Membership[] | any[] = [];
  plansLoading = false;

  actionMessage: string | null = null;

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  loadingProfile = true;
  savingProfile = false;
  changingPassword = false;

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  membership: Membership | null = null;
  membershipLoading = false;
  membershipError: string | null = null;

  stripeClientSecret: string | null = null;
  showPaymentModal = false;
  isProcessingPayment = false;
  paymentError: string | null = null;
  pendingPlanId: string | null = null;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  paymentElement: StripePaymentElement | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
    private assetService: AssetService,
    private membershipService: MembershipService
  ) {}

  async ngOnInit(): Promise<void> {
    this.assetService
      .getCover('personal_area_cover')
      .subscribe((img) => (this.heroImage = img || this.heroImage));

    this.stripe = await loadStripe(environment.stripePublishableKey);

    this.initForms();
    this.loadProfile();
    this.loadMembership();
    this.loadPlans();
  }

  setTab(tab: 'profile' | 'bookings' | 'tickets' | 'membership'): void {
    this.activeTab = tab;
  }

  // Membership tab helper
  setMembershipTab(tab: 'membership' | 'profile' | 'bookings' | 'tickets'): void {
    this.activeTab = tab;
  }

  private initForms(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(NAME_PATTERN)]],
      surname: [
        '',
        [Validators.required, Validators.minLength(2), Validators.pattern(NAME_PATTERN)],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, this.phoneValidator]],
    });

    this.passwordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordStrengthValidator],
      ],
      confirm_password: ['', [Validators.required]],
    });
  }

  private loadProfile(): void {
    this.loadingProfile = true;

    this.authService.getProfile().subscribe({
      next: (profile: UserProfile) => {
        this.loadingProfile = false;
        this.profileForm.patchValue(profile);
        this.profileForm.markAsPristine();
        Object.values(this.profileForm.controls).forEach((c) => c.markAsPristine());
      },
      error: (err) => {
        this.loadingProfile = false;

        // If unauthorized → redirect (OPTIONAL)
        if (err.status === 401) {
          // global interceptor already shows toast
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: '/profile' },
          });
        }
      },
    });
  }

  private loadMembership(): void {
    this.membershipLoading = true;
    this.membershipError = null;

    this.membershipService.getMyMembership().subscribe({
      next: (data) => {
        this.membership = data;
        this.membershipLoading = false;
      },
      error: (err) => {
        this.membershipLoading = false;
        if (err.status === 404) {
          this.membership = null;
          this.membershipError = 'No active membership.';
        } else {
          this.membership = null;
          this.membershipError = 'Could not load membership right now.';
        }
      },
    });
  }

  // ---- Validators ----
  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = (control.value || '').trim();
    if (!value) return null;

    const phoneRegex = /^\+?[1-9]\d{6,14}$/;
    return phoneRegex.test(value) ? null : { invalidPhone: true };
  }

  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) return null;

    const hasMinLength = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[^A-Za-z0-9]/.test(value);

    const isStrong = hasMinLength && hasUpper && hasLower && hasNumber && hasSymbol;
    return isStrong ? null : { passwordStrength: true };
  }

  get newPasswordControl(): AbstractControl | null {
    return this.passwordForm.get('new_password');
  }

  passwordsMatch(): boolean {
    const newPass = this.passwordForm.get('new_password')?.value;
    const confirm = this.passwordForm.get('confirm_password')?.value;
    if (!newPass || !confirm) return true;
    return newPass === confirm;
  }

  get passwordStrengthLevel(): 'weak' | 'medium' | 'strong' | 'empty' {
    const value = this.newPasswordControl?.value as string;
    if (!value) return 'empty';

    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 2) return 'weak';
    if (score === 3 || score === 4) return 'medium';
    return 'strong';
  }

  get canChangePassword(): boolean {
    const formValid = this.passwordForm.valid;
    const passwordsMatch = this.passwordsMatch();
    const isStrong = this.passwordStrengthLevel === 'strong';

    return formValid && passwordsMatch && isStrong && !this.changingPassword;
  }

  get passwordStrengthLabel(): string {
    switch (this.passwordStrengthLevel) {
      case 'weak':
        return 'Weak – needs more gains 💪';
      case 'medium':
        return 'Medium – almost there 🔥';
      case 'strong':
        return 'Strong – beast mode unlocked 🏋️';
      default:
        return '';
    }
  }

  // ---- Helpers ----
  hasError(form: 'profile' | 'password', controlName: string, error: string): boolean {
    const group = (form === 'profile' ? this.profileForm : this.passwordForm) as FormGroup;
    const control = group.get(controlName);
    return !!control && control.touched && control.hasError(error);
  }

  get hasChanges(): boolean {
    return this.profileForm.dirty;
  }

  // ---- Submit handlers ----
  onSaveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    // Build payload only from dirty controls
    const changes: any = {};
    Object.keys(this.profileForm.controls).forEach((key) => {
      const control = this.profileForm.get(key);
      if (control && control.dirty) {
        changes[key] = control.value;
      }
    });

    this.savingProfile = true;

    this.authService.updateProfile(changes).subscribe({
      next: () => {
        this.savingProfile = false;
        this.toast.success('Profile updated successfully!');

        // mark form as pristine again
        this.profileForm.markAsPristine();
        Object.values(this.profileForm.controls).forEach((c) => c.markAsPristine());
      },
      error: () => {
        this.savingProfile = false;
      },
    });
  }

  onChangePassword(): void {
    if (this.passwordForm.invalid || !this.passwordsMatch()) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.changingPassword = true;

    const { old_password, new_password, confirm_password } = this.passwordForm.value;

    this.authService
      .changePassword({
        old_password: old_password as string,
        new_password: new_password as string,
        confirm_password: confirm_password as string,
      })
      .subscribe({
        next: () => {
          this.changingPassword = false;
          this.passwordForm.reset();
          this.toast.success('Password changed successfully.');
        },
        error: (err) => {
          this.changingPassword = false;
          const msg =
            err?.error?.detail ||
            err?.error?.message ||
            'Failed to change password. Please try again.';
          this.toast.error(msg);
        },
      });
  }

  private loadPlans(): void {
    this.plansLoading = true;
    this.membershipService.getPlans().subscribe({
      next: (data: any) => {
        this.plans = data || [];
        this.plansLoading = false;
      },
      error: () => {
        this.plansLoading = false;
      },
    });
  }

  changePlan(planId: string): void {
    this.actionMessage = null;
    this.pendingPlanId = planId;
    this.membershipService.changePlan(planId).subscribe({
      next: (res) => {
        if (res.stripe_client_secret) {
          this.openPaymentModal(res.stripe_client_secret);
        } else {
          this.actionMessage = 'Plan updated.';
          this.loadMembership();
        }
      },
      error: () => {
        this.actionMessage = 'Could not change plan right now.';
      },
    });
  }

  cancelMembership(): void {
    this.actionMessage = null;
    this.membershipService.cancel().subscribe({
      next: () => {
        this.actionMessage = 'Membership cancelled.';
        this.loadMembership();
      },
      error: () => {
        this.actionMessage = 'Could not cancel membership.';
      },
    });
  }

  purchasePlan(planId: string): void {
    this.actionMessage = null;
    this.pendingPlanId = planId;
    this.membershipService.purchase(planId).subscribe({
      next: (res) => {
        if (res.stripe_client_secret) {
          this.openPaymentModal(res.stripe_client_secret);
        } else {
          this.actionMessage = 'Plan activated.';
          this.loadMembership();
        }
      },
      error: () => {
        this.actionMessage = 'Could not start this plan right now.';
      },
    });
  }

  // ------- Stripe payment for memberships -------

  private openPaymentModal(clientSecret: string): void {
    this.stripeClientSecret = clientSecret;
    this.showPaymentModal = true;
    this.paymentError = null;

    setTimeout(() => {
      this.initializeStripeElement();
    }, 50);
  }

  private initializeStripeElement(): void {
    if (!this.stripe || !this.stripeClientSecret) {
      this.paymentError = 'Payment system unavailable.';
      return;
    }

    this.elements = this.stripe.elements({
      clientSecret: this.stripeClientSecret,
    });

    this.paymentElement = this.elements.create('payment');

    const mountPoint = document.getElementById('membership-payment-element');
    if (mountPoint) {
      this.paymentElement.mount(mountPoint);
    }
  }

  async submitMembershipPayment(): Promise<void> {
    if (!this.stripe || !this.elements) {
      this.paymentError = 'Payment system unavailable.';
      return;
    }

    this.isProcessingPayment = true;
    this.paymentError = null;

    const result = await this.stripe.confirmPayment({
      elements: this.elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: window.location.href,
      },
    });

    this.isProcessingPayment = false;

    if (result.error) {
      this.paymentError = result.error.message || 'Payment failed. Please try again.';
      return;
    }

    this.toast.success('Payment received — membership activated soon.');

    // Close modal but keep `pendingPlanId` so we can poll for activation.
    this.closePaymentModal(false);

    // Poll backend until membership shows as active (webhook processed), then refresh UI.
    this.waitForMembershipActivation();
  }

  /**
   * Close the payment modal. By default clears pendingPlanId, but caller can keep
   * it when expecting a backend webhook to activate membership immediately after payment.
   */
  closePaymentModal(clearPending = true): void {
    if (this.isProcessingPayment) return;

    this.showPaymentModal = false;
    this.paymentError = null;
    this.stripeClientSecret = null;

    if (clearPending) {
      this.pendingPlanId = null;
    }

    if (this.paymentElement) {
      this.paymentElement.unmount();
      this.paymentElement = null;
    }
  }

  /** Poll membership endpoint until membership becomes active or timeout */
  private waitForMembershipActivation(attempts = 8, delayMs = 2000): void {
    if (!this.pendingPlanId) {
      // nothing to poll for
      this.loadMembership();
      return;
    }

    const tryCheck = (remaining: number) => {
      this.membershipService.getMyMembership().subscribe({
        next: (m) => {
          // If membership exists and matches the pending plan, we're done
          if (m && m.plan && m.plan.id === this.pendingPlanId) {
            this.membership = m;
            this.actionMessage = 'Plan activated.';
            this.pendingPlanId = null;
            return;
          }

          if (remaining <= 0) {
            // final fallback: refresh membership view
            this.loadMembership();
            return;
          }

          setTimeout(() => tryCheck(remaining - 1), delayMs);
        },
        error: () => {
          if (remaining <= 0) {
            this.loadMembership();
            return;
          }
          setTimeout(() => tryCheck(remaining - 1), delayMs);
        },
      });
    };

    tryCheck(attempts);
  }

  private pollMembership(retries: number): void {
    if (retries <= 0) {
      this.loadMembership();
      return;
    }

    this.membershipService.getMyMembership().subscribe({
      next: (data) => {
        this.membership = data;
        this.membershipError = null;
      },
      error: () => {
        setTimeout(() => this.pollMembership(retries - 1), 1200);
      },
    });
  }
}
