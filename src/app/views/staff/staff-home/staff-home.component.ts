import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-staff-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.scss'],
})
export class StaffHomeComponent {}
