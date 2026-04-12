import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from '@core/services/auth.service';

export const staffLoginGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.ensureCurrentUser().pipe(
    map((user) => {
      if (user?.is_staff) {
        return router.createUrlTree(['/staff']);
      }

      return true;
    })
  );
};
