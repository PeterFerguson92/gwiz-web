import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-staff-event-check-in',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './staff-event-check-in.component.html',
  styleUrls: ['./staff-event-check-in.component.scss'],
})
export class StaffEventCheckInComponent {
  private route = inject(ActivatedRoute);

  eventId$ = this.route.paramMap.pipe(map((params) => params.get('eventId') ?? ''));
}
