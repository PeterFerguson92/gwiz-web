import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from '@core/services/auth.service';

export const staffGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.ensureCurrentUser().pipe(
    map((user) => {
      if (user?.is_staff) {
        return true;
      }

      if (user) {
        return router.createUrlTree(['/staff/login'], {
          queryParams: { reason: 'no_staff' },
        });
      }

      return router.createUrlTree(['/staff/login'], {
        queryParams: { returnUrl: state.url },
      });
    })
  );
};
