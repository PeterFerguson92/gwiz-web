import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { AuthService } from "@core/services/auth.service";

export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
	const auth = inject(AuthService);
	const router = inject(Router);

	if (auth.isLoggedIn()) {
		// Already logged in → send to profile or wherever makes sense
		return router.createUrlTree(["/profile"]);
	}

	// Not logged in → allow access to login/signup
	return true;
};
