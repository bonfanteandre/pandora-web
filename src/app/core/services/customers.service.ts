import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { EndpointsService } from "src/app/shared/services/endpoints.service";
import { OperationResult } from "../models/common/operation-result";
import { Customer } from "../models/customer";

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    constructor (private http: HttpClient, private endpointsService: EndpointsService) { }

    public getPaged(skip: number, take: number, name: string = null): Observable<Customer[]> {
        const url = `${this.endpointsService.apiUrl}/customers?skip=${skip}&take=${take}&name=${name}`;
        return this.http.get<Customer[]>(url);
    }

    public getById(id: string): Observable<Customer> {
        const url = `${this.endpointsService.apiUrl}/customers/${id}`;
        return this.http.get<Customer>(url);
    }

    public create(customer: Customer): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/customers`;
        return this.http.post<OperationResult>(url, customer)
            .pipe(catchError(this.handleError));
    }

    public update(customer: Customer): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/customers/${customer.id}`;
        return this.http.put<OperationResult>(url, customer)
            .pipe(catchError(this.handleError));
    }

    public remove(customer: Customer): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/customers/${customer.id}`;
        return this.http.delete<OperationResult>(url)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error);
    }

}