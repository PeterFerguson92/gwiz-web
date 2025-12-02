import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';

import { Booking, ClassSession, FitnessClass } from '../models/booking.models';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /** GET /fitness-classes/ */
  getFitnessClasses(): Observable<FitnessClass[]> {
    return this.http.get<FitnessClass[]>(`${this.baseUrl}/booking/fitness-classes/?active=true`);
  }

  /** GET /fitness-classes/<id>/sessions/?days=30 */
  getSessionsForClass(classId: number | string, days: number = 30): Observable<ClassSession[]> {
    return this.http.get<ClassSession[]>(
      `${this.baseUrl}/booking/fitness-classes/${classId}/sessions/?days=${days}`
    );
  }

  /** POST /sessions/<id>/book/ */
  bookSession(sessionId: number | string): Observable<any> {
    return this.http.post(`${this.baseUrl}booking/sessions/${sessionId}/book/`, {});
  }

  /** GET /my-bookings/ */
  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/booking/my-bookings/`);
  }

  /** POST /bookings/<id>/cancel/ (for later, when you add cancel-on-UI) */
  cancelBooking(bookingId: number | string): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookings/${bookingId}/cancel/`, {});
  }
}
