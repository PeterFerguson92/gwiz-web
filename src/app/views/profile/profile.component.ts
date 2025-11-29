import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../core/models/auth.models';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BreadcrumbComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  loadingProfile = true;
  savingProfile = false;
  changingPassword = false;

  profileSuccess = '';
  profileError = '';
  passwordSuccess = '';
  passwordError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadProfile();
  }

  private initForms(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(NAME_PATTERN)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(NAME_PATTERN)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, this.phoneValidator]],
    });

    this.passwordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirm_password: ['', [Validators.required]],
    });
  }

  private loadProfile(): void {
    this.loadingProfile = true;
    this.authService.getProfile().subscribe({
      next: (profile: UserProfile) => {
        this.loadingProfile = false;
        this.profileForm.patchValue(profile);
      },
      error: () => {
        this.loadingProfile = false;
        this.profileError = 'Failed to load profile. Please try again.';
      }
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

  get passwordStrengthLabel(): string {
    switch (this.passwordStrengthLevel) {
      case 'weak': return 'Weak – needs more gains 💪';
      case 'medium': return 'Medium – almost there 🔥';
      case 'strong': return 'Strong – beast mode unlocked 🏋️';
      default: return '';
    }
  }

  // ---- Helpers ----
  hasError(form: 'profile' | 'password', controlName: string, error: string): boolean {
    const group = (form === 'profile' ? this.profileForm : this.passwordForm) as FormGroup;
    const control = group.get(controlName);
    return !!control && control.touched && control.hasError(error);
  }

  // ---- Submit handlers ----
  onSaveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.savingProfile = true;
    this.profileError = '';
    this.profileSuccess = '';

    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        this.savingProfile = false;
        this.profileSuccess = 'Profile updated successfully.';
      },
      error: (err) => {
        this.savingProfile = false;
        this.profileError =
          err?.error?.detail ||
          err?.error?.message ||
          'Failed to update profile. Please try again.';
      },
    });
  }

  onChangePassword(): void {
    if (this.passwordForm.invalid || !this.passwordsMatch()) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.changingPassword = true;
    this.passwordError = '';
    this.passwordSuccess = '';

    const { old_password, new_password } = this.passwordForm.value;

    this.authService.changePassword({
      old_password: old_password as string,
      new_password: new_password as string,
    }).subscribe({
      next: () => {
        this.changingPassword = false;
        this.passwordSuccess = 'Password changed successfully.';
        this.passwordForm.reset();
      },
      error: (err) => {
        this.changingPassword = false;
        this.passwordError =
          err?.error?.detail ||
          err?.error?.message ||
          'Failed to change password. Please try again.';
      },
    });
  }
}
