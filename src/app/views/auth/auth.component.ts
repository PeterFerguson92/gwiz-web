import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors } from "@angular/forms";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { AuthService } from "@core/services/auth.service";

@Component({
	selector: "app-auth",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "./auth.component.html",
	styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
	isLogin = true;
	isSubmitting = false;
	errorMessage = "";

	loginForm: FormGroup;
	signupForm: FormGroup;

	constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
		// LOGIN FORM
		this.loginForm = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]],
			rememberMe: [false],
		});

		// SIGNUP FORM
		this.signupForm = this.fb.group({
			name: ["", [Validators.required]],
			surname: ["", [Validators.required]],
			email: ["", [Validators.required, Validators.email]],
			phone_number: ["", [Validators.required]],
			password: [
				"",
				[
					Validators.required,
					Validators.minLength(8), // bump to 8
					this.passwordStrengthValidator.bind(this),
				],
			],
			confirmPassword: ["", [Validators.required]],
		});
  }
  
  get passwordControl(): AbstractControl | null {
  return this.signupForm.get('password');
}

get passwordStrengthLevel(): 'weak' | 'medium' | 'strong' | 'empty' {
  const value = this.passwordControl?.value as string;
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
    case 'weak':
      return 'Needs more gains 💪';
    case 'medium':
      return 'Ok we getting there 🔥';
    case 'strong':
      return 'Beast mode unlocked 🏋️';
    default:
      return '';
  }
}

	ngOnInit(): void {
		// Set initial mode based on route URL (/login or /signup)
		this.syncModeWithUrl(this.router.url);

		// Listen to route changes to keep UI synced with URL
		this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe((e) => this.syncModeWithUrl(e.urlAfterRedirects));
	}

	switchMode(mode: "login" | "signup"): void {
		this.errorMessage = "";

		if (mode === "login") {
			this.router.navigate(["/login"]);
		} else {
			this.router.navigate(["/signup"]);
		}
	}

	// ---------- LOGIN ----------
	onLoginSubmit(): void {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		this.isSubmitting = true;
		this.errorMessage = "";

		const { email, password } = this.loginForm.value;

		this.authService
			.login({
				email: email as string,
				password: password as string,
			})
			.subscribe({
				next: () => {
					this.isSubmitting = false;
					this.router.navigate(["/home"]);
				},
				error: (err) => {
					this.isSubmitting = false;
					this.errorMessage = err?.error?.detail || err?.error?.message || "Login failed. Please check your credentials.";
				},
			});
	}

	// ---------- SIGNUP ----------
	onSignupSubmit(): void {
		if (this.signupForm.invalid || !this.passwordsMatch()) {
			this.signupForm.markAllAsTouched();
			return;
		}

		this.isSubmitting = true;
		this.errorMessage = "";

		const { name, surname, email, phone_number, password } = this.signupForm.value;

		this.authService
			.register({
				name: name as string,
				surname: surname as string,
				email: email as string,
				phone_number: phone_number as string,
				password: password as string,
			})
			.subscribe({
				next: () => {
					this.isSubmitting = false;
					this.router.navigate(["/login"]);
				},
				error: (err) => {
					this.isSubmitting = false;
					this.errorMessage = err?.error?.detail || err?.error?.message || "Signup failed. Please try again.";
				},
			});
	}

	private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
		const value = control.value as string;
		if (!value) {
			return null; // handled by 'required'
		}

		const hasMinLength = value.length >= 8;
		const hasUpper = /[A-Z]/.test(value);
		const hasLower = /[a-z]/.test(value);
		const hasNumber = /[0-9]/.test(value);
		const hasSymbol = /[^A-Za-z0-9]/.test(value);

		const isStrong = hasMinLength && hasUpper && hasLower && hasNumber && hasSymbol;

		return isStrong ? null : { passwordStrength: true };
	}

	private syncModeWithUrl(url: string): void {
		if (url.includes("/signup")) {
			this.isLogin = false;
		} else {
			this.isLogin = true;
		}

		this.errorMessage = ""; // reset errors when switching
	}

  

	// ---------- HELPERS ----------
	passwordsMatch(): boolean {
		const { password, confirmPassword } = this.signupForm.value;
		return !!password && !!confirmPassword && (password as string) === (confirmPassword as string);
	}

	hasError(form: "login" | "signup", controlName: string, error: string): boolean {
		const group = (form === "login" ? this.loginForm : this.signupForm) as FormGroup;

		const control = group.get(controlName);
		return !!control && control.touched && control.hasError(error);
	}
}
