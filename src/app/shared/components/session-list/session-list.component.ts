import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  sessionDateLabel(session: any) {
    return new Date(session.start).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }

  sessionTimeLabel(session: any) {
    return new Date(session.start).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  onBook(session: any) {
    this.book.emit(session);
  }
}
