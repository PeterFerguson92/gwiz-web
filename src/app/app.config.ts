import { IMAGE_CONFIG } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { HttpErrorInterceptor } from '@core/services/http-error.interceptor';

import { routes } from './app.routes';
import { AuthInterceptor } from './core/services/auth.interceptor'; // ⬅️ path from app.config.ts

export const appConfig: ApplicationConfig = {
  providers: [
    // IMPORTANT: wire HttpClient to DI-based interceptors
    provideHttpClient(withInterceptorsFromDi()),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
};
