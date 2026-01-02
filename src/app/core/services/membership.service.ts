import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { Membership, MembershipPlan, MembershipResponse } from '@core/models/membership.models';

@Injectable({ providedIn: 'root' })
export class MembershipService {
  private readonly baseUrl = `${environment.apiUrl}/booking/memberships`;

  constructor(private http: HttpClient) {}

  getPlans(): Observable<MembershipPlan[]> {
    return this.http.get<MembershipPlan[]>(`${this.baseUrl}/plans/`);
  }

  getMyMembership(): Observable<Membership> {
    return this.http.get<Membership>(`${this.baseUrl}/me/`);
  }

  purchase(planId: string): Observable<MembershipResponse> {
    return this.http.post<MembershipResponse>(`${this.baseUrl}/purchase/`, { plan_id: planId });
  }

  changePlan(planId: string): Observable<MembershipResponse> {
    return this.http.post<MembershipResponse>(`${this.baseUrl}/change/`, { plan_id: planId });
  }

  cancel(): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${this.baseUrl}/cancel/`, {});
  }
}
