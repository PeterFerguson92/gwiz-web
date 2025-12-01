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

  ngOnInit(): void {
    // 🔐 Try to restore session (in-memory access token) on app startup
    this.auth.initAuthOnStartup().subscribe();

    aos.init();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
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
}
