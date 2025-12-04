import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FitnessClass } from '@core/models/fitness.models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  /** Optional class info (for class details page) */
  @Input() classData: FitnessClass | null = null;

  /** Auth state passed from parent (must be wired correctly) */
  @Input() isLoggedIn = false;

  constructor(private router: Router) {}

  navigateTo(route: string) {
    // Small safety: strip double slashes
    const clean = route.startsWith('/') ? route : `/${route}`;
    this.router.navigateByUrl(clean);
  }
}
