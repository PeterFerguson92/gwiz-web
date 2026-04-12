import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import {
  AttendanceActionPayload,
  AttendanceActionResponse,
  AttendanceAttendeeItem,
  AttendanceListQuery,
  AttendancePaginatedResponse,
  AttendanceSearchQuery,
} from '@core/models/attendance.models';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly eventsBaseUrl = `${environment.apiUrl}/events`;
  private readonly bookingBaseUrl = `${environment.apiUrl}/booking`;

  constructor(private http: HttpClient) {}

  checkInTicket(ticketId: string, payload: AttendanceActionPayload = {}): Observable<AttendanceActionResponse> {
    return this.http.post<AttendanceActionResponse>(
      `${this.eventsBaseUrl}/tickets/${ticketId}/check-in/`,
      payload
    );
  }

  revertTicketCheckIn(
    ticketId: string,
    payload: AttendanceActionPayload = {}
  ): Observable<AttendanceActionResponse> {
    return this.http.post<AttendanceActionResponse>(
      `${this.eventsBaseUrl}/tickets/${ticketId}/revert-check-in/`,
      payload
    );
  }

  checkInBooking(
    bookingId: string,
    payload: AttendanceActionPayload = {}
  ): Observable<AttendanceActionResponse> {
    return this.http.post<AttendanceActionResponse>(
      `${this.bookingBaseUrl}/bookings/${bookingId}/check-in/`,
      payload
    );
  }

  revertBookingCheckIn(
    bookingId: string,
    payload: AttendanceActionPayload = {}
  ): Observable<AttendanceActionResponse> {
    return this.http.post<AttendanceActionResponse>(
      `${this.bookingBaseUrl}/bookings/${bookingId}/revert-check-in/`,
      payload
    );
  }

  getEventAttendees(
    eventId: string,
    query: AttendanceListQuery = {}
  ): Observable<AttendancePaginatedResponse<AttendanceAttendeeItem>> {
    return this.http.get<AttendancePaginatedResponse<AttendanceAttendeeItem>>(
      `${this.eventsBaseUrl}/${eventId}/attendees/`,
      {
        params: this.buildParams(query),
      }
    );
  }

  getSessionAttendees(
    sessionId: string,
    query: AttendanceListQuery = {}
  ): Observable<AttendancePaginatedResponse<AttendanceAttendeeItem>> {
    return this.http.get<AttendancePaginatedResponse<AttendanceAttendeeItem>>(
      `${this.bookingBaseUrl}/sessions/${sessionId}/attendees/`,
      {
        params: this.buildParams(query),
      }
    );
  }

  searchTickets(
    query: AttendanceSearchQuery
  ): Observable<AttendancePaginatedResponse<AttendanceAttendeeItem>> {
    return this.http.get<AttendancePaginatedResponse<AttendanceAttendeeItem>>(
      `${this.eventsBaseUrl}/tickets/search/`,
      {
        params: this.buildParams(query),
      }
    );
  }

  searchBookings(
    query: AttendanceSearchQuery
  ): Observable<AttendancePaginatedResponse<AttendanceAttendeeItem>> {
    return this.http.get<AttendancePaginatedResponse<AttendanceAttendeeItem>>(
      `${this.bookingBaseUrl}/bookings/search/`,
      {
        params: this.buildParams(query),
      }
    );
  }

  private buildParams(query: AttendanceListQuery | AttendanceSearchQuery): HttpParams {
    let params = new HttpParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return params;
  }
}
