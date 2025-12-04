import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ClassSession, FitnessClass } from '@core/models/fitness.models';

import { FormattersService } from '../../service/formatters.service';
import { SHARED_IMPORTS } from '../../shared-imports';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule, SHARED_IMPORTS],
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.scss',
})
export class SessionListComponent {
  @Input() sessions: any[] = [];
  @Input() loading = false;
  @Input() isLoggedIn = false;
  @Input() bookingLoading: Record<number, boolean> = {};
  @Input() fitnessClass: FitnessClass | null = null;

  @Output() book = new EventEmitter<any>();
  constructor(private formattersService: FormattersService) {}

  sessionDateLabel(session: ClassSession): string {
    return this.formattersService.formatSessionDate(session);
  }

  sessionTimeLabel(session: ClassSession): string {
    return this.formattersService.formatSessionTime(session);
  }

  effectiveCapacity(session: ClassSession): number | null {
    console.log('fitnessClass in effectiveCapacity:', this.fitnessClass);
    console.log('session in effectiveCapacity:', session);
    console.log('formattersService in effectiveCapacity:', this.formattersService);
    return this.formattersService.getSessionCapacity(session, this.fitnessClass);
  }

  effectivePrice(session: ClassSession): number | null {
    return this.formattersService.getSessionPrice(session, this.fitnessClass);
  }

  onBook(session: any) {
    this.book.emit(session);
  }
}
