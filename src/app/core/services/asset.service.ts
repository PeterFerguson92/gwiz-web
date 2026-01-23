import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, shareReplay } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '@/environments/environment';
import { AssetsPayload } from '@core/models/asset.models';

@Injectable({ providedIn: 'root' })
export class AssetService {
  private readonly baseUrl = `${environment.apiUrl}/homepage/assets/`;
  private readonly contactUrl = `${environment.apiUrl}/homepage/contact`;
  private cached$?: Observable<AssetsPayload[]>;
  private contactCached$?: Observable<any>;

  constructor(private http: HttpClient) {}

  getAssets(): Observable<AssetsPayload[]> {
    if (!this.cached$) {
      this.cached$ = this.http.get<{ status: string; result: AssetsPayload[] }>(this.baseUrl).pipe(
        map((res) => res.result || []),
        catchError(() => of([])),
        shareReplay(1)
      );
    }
    return this.cached$;
  }

  getCover<K extends keyof AssetsPayload>(key: K): Observable<string | null> {
    return this.getAssets().pipe(
      map((assets) => {
        const first = assets[0];
        if (!first) return null;
        const val = first[key];
        return typeof val === 'string' && val.length > 0 ? val : null;
      })
    );
  }

  getContactData(): Observable<any> {
    if (!this.contactCached$) {
      this.contactCached$ = this.http.get<{ status: string; result: any[] }>(this.contactUrl).pipe(
        map((res) => res.result?.[0] || null),
        catchError(() => of(null)),
        shareReplay(1)
      );
    }
    return this.contactCached$;
  }

  getGoogleKey(): Observable<string | null> {
    return this.getContactData().pipe(map((contact) => contact?.google_key || null));
  }
}
