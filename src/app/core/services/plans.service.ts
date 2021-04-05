import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EndpointsService } from "src/app/shared/services/endpoints.service";
import { Observable, throwError } from "rxjs";
import { Plan } from "../models/plan";
import { OperationResult } from "../models/common/operation-result";
import { catchError } from 'rxjs/operators';

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

    public getAll(): Observable<Plan[]> {
        const url = `${this.endpointsService.apiUrl}/plans/all`;
        return this.http.get<Plan[]>(url);
    }

    public create(plan: Plan): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/plans`;
        return this.http.post<OperationResult>(url, plan)
            .pipe(catchError(this.handleError));
    }

    public update(plan: Plan): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/plans/${plan.id}`;
        return this.http.put<OperationResult>(url, plan)
            .pipe(catchError(this.handleError));
    }

    public remove(plan: Plan): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/plans/${plan.id}`;
        return this.http.delete<OperationResult>(url)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error);
    }
}