import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from "src/app/shared/services/endpoints.service";
import { Observable } from "rxjs";
import { Plan } from "../models/plan";

@Injectable({
    providedIn: 'root'
})
export class PlansService {

    constructor (private http: HttpClient, private endpointsService: EndpointsService) { }

    public getPaged(skip: number, take: number, name: string = null): Observable<Plan[]> {
        const url = `${this.endpointsService.apiUrl}/plans?skip=${skip}&take=${take}&name=${name}`;
        return this.http.get<Plan[]>(url);
    }
}