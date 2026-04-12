import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-staff-session-attendance',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './staff-session-attendance.component.html',
  styleUrls: ['./staff-session-attendance.component.scss'],
})
export class StaffSessionAttendanceComponent {
  private route = inject(ActivatedRoute);

  sessionId$ = this.route.paramMap.pipe(map((params) => params.get('sessionId') ?? ''));
}
