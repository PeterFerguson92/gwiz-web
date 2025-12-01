import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // We consider the user logged in if we have an access token in memory
  // OR at least a refresh token in localStorage (isLoggedIn() already does this)
  if (auth.isLoggedIn()) {
    return true;
  }

  // Not logged in → send to /login with returnUrl
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};
