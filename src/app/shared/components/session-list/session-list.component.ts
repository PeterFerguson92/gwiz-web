import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ClassSession } from '@core/models/fitness.models';

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

  @Output() book = new EventEmitter<any>();
  constructor(private formattersService: FormattersService) {}

  sessionDateLabel(session: ClassSession): string {
    return this.formattersService.formatSessionDate(session);
  }

  sessionTimeLabel(session: ClassSession): string {
    return this.formattersService.formatSessionTime(session);
  }

  onBook(session: any) {
    this.book.emit(session);
  }
}
