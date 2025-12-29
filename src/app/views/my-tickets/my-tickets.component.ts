import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { FormattersService } from '@/app/shared/service/formatters.service';
import { SHARED_IMPORTS } from '@/app/shared/shared-imports';
import { EventTicket } from '@core/models/event.models';
import { EventService } from '@core/services/event.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeroComponent, ...SHARED_IMPORTS],
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
})
export class MyTicketsComponent implements OnInit {
  tickets: EventTicket[] = [];
  loading = false;

  statusFilter: 'all' | 'confirmed' | 'reserved' | 'cancelled' = 'confirmed';

  ticketPendingCancel: EventTicket | null = null;
  cancellingId: string | null = null;
  isCancelling = false;

  constructor(
    private eventService: EventService,
    private toast: ToastService,
    public formatters: FormattersService
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  get filteredTickets(): EventTicket[] {
    if (this.statusFilter === 'all') return this.tickets;
    return this.tickets.filter((t) => t.status === this.statusFilter);
  }

  setStatusFilter(filter: 'all' | 'confirmed' | 'reserved' | 'cancelled'): void {
    this.statusFilter = filter;
  }

  private loadTickets(): void {
    this.loading = true;
    this.eventService.getMyTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toast.error('Could not load your tickets right now.');
      },
    });
  }

  trackByTicketId(_index: number, ticket: EventTicket): string {
    return ticket.id;
  }

  getStatusChip(ticket: EventTicket): string {
    if (ticket.status === 'cancelled') return 'Cancelled';
    if (ticket.status === 'reserved') return 'Reserved';
    return 'Confirmed';
  }

  getPaymentChip(ticket: EventTicket): string {
    switch (ticket.payment_status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Payment pending';
      case 'void':
        return 'Refunded';
      case 'included':
      default:
        return 'Included';
    }
  }

  canCancel(ticket: EventTicket): boolean {
    const isCancelled = ticket.status === 'cancelled';
    const inFuture = this.formatters.isEventInFuture(ticket.event);
    return !isCancelled && inFuture;
  }

  openCancelModal(ticket: EventTicket): void {
    if (!this.canCancel(ticket)) return;
    this.ticketPendingCancel = ticket;
  }

  closeCancelModal(): void {
    if (this.isCancelling) return;
    this.ticketPendingCancel = null;
  }

  confirmCancel(): void {
    const ticket = this.ticketPendingCancel;
    if (!ticket) return;

    this.isCancelling = true;
    this.cancellingId = ticket.id;

    this.eventService.cancelTicket(ticket.id).subscribe({
      next: (updated) => {
        const idx = this.tickets.findIndex((t) => t.id === updated.id);
        if (idx !== -1) {
          this.tickets[idx] = { ...this.tickets[idx], ...updated };
        }
        this.toast.success('Your ticket has been cancelled.');
        this.isCancelling = false;
        this.cancellingId = null;
        this.ticketPendingCancel = null;
      },
      error: (err) => {
        this.isCancelling = false;
        this.cancellingId = null;

        const detail = err?.error?.detail || 'Could not cancel this ticket.';
        this.toast.error(detail);
      },
    });
  }
}
