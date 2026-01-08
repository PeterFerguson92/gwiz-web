import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { Event, EventTicket, PurchaseTicketPayload, PurchaseTicketResponse } from '@core/models/event.models';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly baseUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  /** GET /api/events/ — list active upcoming events (featured-first) */
  listEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/`);
  }

  /** GET /api/events/:id/ — event detail */
  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}/`);
  }

  /** POST /api/events/:id/tickets/ — purchase tickets (guests can include contact info) */
  purchaseTickets(eventId: string, payload: PurchaseTicketPayload): Observable<PurchaseTicketResponse> {
    return this.http.post<PurchaseTicketResponse>(`${this.baseUrl}/${eventId}/tickets/`, payload);
  }

  /** GET /api/events/tickets/my/ — current user's tickets */
  getMyTickets(): Observable<EventTicket[]> {
    return this.http.get<EventTicket[]>(`${this.baseUrl}/tickets/my/`);
  }

  /** POST /api/events/tickets/:ticket_id/cancel/ — cancel ticket */
  cancelTicket(ticketId: string, token?: string): Observable<EventTicket> {
    const payload = token ? { token } : {};
    return this.http.post<EventTicket>(`${this.baseUrl}/tickets/${ticketId}/cancel/`, payload);
  }
}
