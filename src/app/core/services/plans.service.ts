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

    public getById(id: string): Observable<Plan> {
        const url = `${this.endpointsService.apiUrl}/plans/${id}`;
        return this.http.get<Plan>(url);
    }

    public create(plan: Plan): Observable<void> {
        const url = `${this.endpointsService.apiUrl}/plans`;
        return this.http.post<void>(url, plan);
    }

    public update(plan: Plan): Observable<void> {
        const url = `${this.endpointsService.apiUrl}/plans/${plan.id}`;
        return this.http.put<void>(url, plan);
    }

    public remove(plan: Plan): Observable<void> {
        const url = `${this.endpointsService.apiUrl}/plans/${plan.id}`;
        return this.http.delete<void>(url);
    }
}