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

  signOut(): void {
    this.authService.logout(false);
    this.router.navigate(['/staff/login']);
  }
}
