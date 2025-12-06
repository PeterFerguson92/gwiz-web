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

@Injectable({ providedIn: 'root' })
export class FitnessClassService {
  private readonly baseUrl = `${environment.apiUrl}/booking`;

  constructor(private http: HttpClient) {}

  /**
   * LIST all fitness classes
   * GET /api/booking/fitness-classes/?active=true|false
   */
  getAllFitnessClasses(active?: boolean): Observable<FitnessClass[]> {
    let params = new HttpParams();
    if (active !== undefined) {
      params = params.set('active', String(active)); // "true" / "false"
    }

    return this.http.get<FitnessClass[]>(`${this.baseUrl}/fitness-classes/`, {
      params,
    });
  }

  /** GET /api/booking/fitness-classes/:id/ */
  getFitnessClass(id: string): Observable<FitnessClass> {
    return this.http.get<FitnessClass>(`${this.baseUrl}/fitness-classes/${id}/`);
  }

  /** GET /api/booking/fitness-classes/:id/with-sessions/?days=30 */
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

  /**
   * GET upcoming sessions for a class using the with-sessions endpoint
   * GET /api/booking/fitness-classes/:id/with-sessions/?days=30
   */
  getClassSessions(id: string, days: number = 30) {
    const params = new HttpParams().set('days', days.toString());

    return this.http
      .get<FitnessClass>(`${this.baseUrl}/fitness-classes/${id}/with-sessions/`, {
        params,
      })
      .pipe(map((fitnessClass: FitnessClass) => fitnessClass.upcoming_sessions ?? []));
  }

  /** POST /api/booking/sessions/:id/book/ */
  bookSession(sessionId: string): Observable<BookSessionResponse> {
    return this.http.post<BookSessionResponse>(`${this.baseUrl}/sessions/${sessionId}/book/`, {});
  }

  getMyBookings(): Observable<BookingWithDetails[]> {
    return this.http.get<BookingWithDetails[]>(`${this.baseUrl}/my-bookings/`);
  }

  cancelBooking(bookingId: string): Observable<BookingWithDetails> {
    const url = `${this.baseUrl}/bookings/${bookingId}/cancel/`;
    return this.http.post<BookingWithDetails>(url, {});
  }
}
