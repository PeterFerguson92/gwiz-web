import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { UserProfile } from "../../core/models/auth.models";
import { BreadcrumbComponent } from "@app/components/breadcrumb/breadcrumb.component";
import { ToastComponent } from "@/app/shared/components/toast/toast.component";
const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

@Component({
	selector: "app-profile",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, BreadcrumbComponent, ToastComponent],
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
	profileForm!: FormGroup;
	passwordForm!: FormGroup;

	loadingProfile = true;
	savingProfile = false;
	changingPassword = false;

	profileSuccess = "";
	profileError = "";
	passwordSuccess = "";
	passwordError = "";

	toastMessage = "";
	toastType: "success" | "error" = "success";
	showToast = false;

	constructor(private fb: FormBuilder, private authService: AuthService) {}

	ngOnInit(): void {
		this.initForms();
		this.loadProfile();
	}

	private initForms(): void {
		this.profileForm = this.fb.group({
			name: ["", [Validators.required, Validators.minLength(2), Validators.pattern(NAME_PATTERN)]],
			surname: ["", [Validators.required, Validators.minLength(2), Validators.pattern(NAME_PATTERN)]],
			email: ["", [Validators.required, Validators.email]],
			phone_number: ["", [Validators.required, this.phoneValidator]],
		});

		this.passwordForm = this.fb.group({
			old_password: ["", [Validators.required]],
			new_password: ["", [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
			confirm_password: ["", [Validators.required]],
		});
	}

	private loadProfile(): void {
		this.loadingProfile = true;
		this.authService.getProfile().subscribe({
			next: (profile: UserProfile) => {
				this.loadingProfile = false;
				this.profileForm.patchValue(profile);
				// mark form as pristine
				this.profileForm.markAsPristine();
				Object.values(this.profileForm.controls).forEach((c) => c.markAsPristine());
			},
			error: (err) => {
				this.loadingProfile = false;

				if (err.status === 401) {
					this.triggerToast("Session expired — please log in again.", "error");
					// this.router.navigate(["/login"], {
					// 	queryParams: { returnUrl: "/profile" },
					// });
					return;
				}

				this.triggerToast("Failed to load your profile. Please try again.", "error");
			},
		});
	}

	// ---- Validators ----
	private phoneValidator(control: AbstractControl): ValidationErrors | null {
		const value = (control.value || "").trim();
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
		return this.passwordForm.get("new_password");
	}

	passwordsMatch(): boolean {
		const newPass = this.passwordForm.get("new_password")?.value;
		const confirm = this.passwordForm.get("confirm_password")?.value;
		if (!newPass || !confirm) return true;
		return newPass === confirm;
	}

	private triggerToast(message: string, type: "success" | "error") {
    console.log("Triggering toast:", message, type);
		this.toastMessage = message;
		this.toastType = type;
		this.showToast = true;

		setTimeout(() => {
			this.showToast = false;
		}, 3000); // 3 seconds
	}

	get passwordStrengthLevel(): "weak" | "medium" | "strong" | "empty" {
		const value = this.newPasswordControl?.value as string;
		if (!value) return "empty";

		let score = 0;
		if (value.length >= 8) score++;
		if (/[A-Z]/.test(value)) score++;
		if (/[a-z]/.test(value)) score++;
		if (/[0-9]/.test(value)) score++;
		if (/[^A-Za-z0-9]/.test(value)) score++;

		if (score <= 2) return "weak";
		if (score === 3 || score === 4) return "medium";
		return "strong";
	}

	get passwordStrengthLabel(): string {
		switch (this.passwordStrengthLevel) {
			case "weak":
				return "Weak – needs more gains 💪";
			case "medium":
				return "Medium – almost there 🔥";
			case "strong":
				return "Strong – beast mode unlocked 🏋️";
			default:
				return "";
		}
	}

	// ---- Helpers ----
	hasError(form: "profile" | "password", controlName: string, error: string): boolean {
		const group = (form === "profile" ? this.profileForm : this.passwordForm) as FormGroup;
		const control = group.get(controlName);
		return !!control && control.touched && control.hasError(error);
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

		// If nothing changed, don't call the API
		if (Object.keys(changes).length === 0) {
			this.profileSuccess = "Nothing to update – your profile is already up to date.";
			this.profileError = "";
			return;
		}

		this.savingProfile = true;
		this.profileError = "";
		this.profileSuccess = "";

		this.authService.updateProfile(changes).subscribe({
			next: () => {
				this.savingProfile = false;
				this.triggerToast("Profile updated successfully!", "success");

				// mark form as pristine again
				this.profileForm.markAsPristine();
				Object.values(this.profileForm.controls).forEach((c) => c.markAsPristine());
			},
			error: (err) => {
				this.savingProfile = false;
				this.triggerToast("Failed to update profile. Please try again.", "error");
			},
		});
	}

	onChangePassword(): void {
		if (this.passwordForm.invalid || !this.passwordsMatch()) {
			this.passwordForm.markAllAsTouched();
			return;
		}

		this.changingPassword = true;
		this.passwordError = "";
		this.passwordSuccess = "";

		const { old_password, new_password } = this.passwordForm.value;

		this.authService
			.changePassword({
				old_password: old_password as string,
				new_password: new_password as string,
			})
			.subscribe({
				next: () => {
					this.changingPassword = false;
					this.passwordSuccess = "Password changed successfully.";
					this.passwordForm.reset();
				},
				error: (err) => {
					this.changingPassword = false;
					this.passwordError = err?.error?.detail || err?.error?.message || "Failed to change password. Please try again.";
				},
			});
	}
}
