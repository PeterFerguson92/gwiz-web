import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  /** Optional class info (for class details page) */
  @Input() classData: any = null;

  /** Auth state passed from parent (must be wired correctly) */
  @Input() isLoggedIn = false;

  constructor(private router: Router) {}

  navigateTo(route: string) {
    // Small safety: strip double slashes
    const clean = route.startsWith('/') ? route : `/${route}`;
    this.router.navigateByUrl(clean);
  }
}
