import { Component, inject, type OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import aos from 'aos';
import { filter, map, mergeMap } from 'rxjs';

import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ScrollToTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private titleService = inject(Title);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private auth = inject(AuthService); // 👈 inject auth
  private aosInitialized = false;

  ngOnInit(): void {
    // 🔐 Try to restore session (in-memory access token) on app startup
    this.auth.initAuthOnStartup().subscribe();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const isStaffRoute = this.router.url.startsWith('/staff');
          this.syncShellTheme(isStaffRoute);
          this.syncAosState(isStaffRoute);

          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        if (data['title']) {
          this.titleService.setTitle('Flight School X Chamber Gang');
        }
      });
  }

  private syncShellTheme(isStaffRoute: boolean): void {
    document.body.classList.toggle('staff-shell-active', isStaffRoute);
  }

  private syncAosState(isStaffRoute: boolean): void {
    if (isStaffRoute) {
      document.body.removeAttribute('data-aos-easing');
      document.body.removeAttribute('data-aos-duration');
      document.body.removeAttribute('data-aos-delay');
      return;
    }

    if (!this.aosInitialized) {
      aos.init({
        disable: () => this.router.url.startsWith('/staff'),
      });
      this.aosInitialized = true;
      return;
    }

    aos.refreshHard();
  }
}
