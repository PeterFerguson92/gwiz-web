import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-staff-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './staff-layout.component.html',
  styleUrls: ['./staff-layout.component.scss'],
})
export class StaffLayoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get isCompactFlowRoute(): boolean {
    return /\/staff\/check-in\/(scan|token)$/.test(this.router.url);
  }

  get eventCheckInLink(): string {
    const match = this.router.url.match(/\/staff\/events\/([^/]+)\/check-in/);
    return match ? `/staff/events/${match[1]}/check-in` : '/staff';
  }

  get sessionAttendanceLink(): string {
    const match = this.router.url.match(/\/staff\/classes\/([^/]+)\/attendance/);
    return match ? `/staff/classes/${match[1]}/attendance` : '/staff';
  }

  signOut(): void {
    this.authService.logout(false);
    this.router.navigate(['/staff/login']);
  }
}
