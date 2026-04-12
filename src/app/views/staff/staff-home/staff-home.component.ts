import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-staff-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.scss'],
})
export class StaffHomeComponent {
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
