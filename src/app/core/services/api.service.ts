import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "@/environments/environment";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	baseUrl = environment.apiUrl;

	constructor(private http: HttpClient) {}

	getResource(resource: string): Observable<any> {
		const url = `${this.baseUrl}/${resource}/`;
		return this.http.get(url);
	}
}
