// src/app/core/services/booking.service.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import {
  BookingWithDetails,
  BookSessionResponse,
  ClassSession,
  FitnessClass,
} from '@core/models/fitness.models';

export interface FitnessClassWithSessions extends FitnessClass {
  upcoming_sessions: ClassSession[];
}

export interface UpcomingSessionsQuery {
  from_date?: string;
  to_date?: string;
  genre?: string;
}

@Injectable({ providedIn: 'root' })
export class FitnessClassService {
  private readonly baseUrl = `${environment.apiUrl}/booking`;

  constructor(private http: HttpClient) {}

  getAllFitnessClasses(active?: boolean): Observable<FitnessClass[]> {
    let params = new HttpParams();
    if (active !== undefined) {
      params = params.set('active', String(active));
    }

    return this.http.get<FitnessClass[]>(`${this.baseUrl}/fitness-classes/`, {
      params,
    });
  }

  getFitnessClass(id: string): Observable<FitnessClass> {
    return this.http.get<FitnessClass>(`${this.baseUrl}/fitness-classes/${id}/`);
  }

  getFitnessClassWithSessions(id: string, days?: number): Observable<FitnessClassWithSessions> {
    let params = new HttpParams();
    if (days != null) {
      params = params.set('days', days.toString());
    }

    return this.http.get<FitnessClassWithSessions>(
      `${this.baseUrl}/fitness-classes/${id}/with-sessions/`,
      { params }
    );
  }

  getClassSessions(id: string, days: number = 30) {
    const params = new HttpParams().set('days', days.toString());

    return this.http
      .get<FitnessClass>(`${this.baseUrl}/fitness-classes/${id}/with-sessions/`, {
        params,
      })
      .pipe(map((fitnessClass: FitnessClass) => fitnessClass.upcoming_sessions ?? []));
  }

  getAllUpcomingSessions(query: UpcomingSessionsQuery = {}): Observable<ClassSession[]> {
    let params = new HttpParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return this.http.get<ClassSession[]>(`${this.baseUrl}/sessions/all-upcoming`, {
      params,
    });
  }

  bookSession(sessionId: string): Observable<BookSessionResponse> {
    return this.http.post<BookSessionResponse>(`${this.baseUrl}/sessions/${sessionId}/book/`, {});
  }

  bookSessionAsGuest(
    sessionId: string,
    guest: { guest_name: string; guest_email: string; guest_phone: string }
  ): Observable<BookSessionResponse> {
    return this.http.post<BookSessionResponse>(
      `${this.baseUrl}/sessions/${sessionId}/book/`,
      guest
    );
  }

  getMyBookings(): Observable<BookingWithDetails[]> {
    return this.http.get<BookingWithDetails[]>(`${this.baseUrl}/my-bookings/`);
  }

  cancelBooking(bookingId: string): Observable<BookingWithDetails> {
    const url = `${this.baseUrl}/bookings/${bookingId}/cancel/`;
    return this.http.post<BookingWithDetails>(url, {});
  }

  cancelBookingAsGuest(bookingId: string, token: string): Observable<BookingWithDetails> {
    const url = `${this.baseUrl}/bookings/${bookingId}/cancel/`;
    return this.http.post<BookingWithDetails>(url, { token });
  }
}
