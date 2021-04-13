import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { EndpointsService } from "src/app/shared/services/endpoints.service";
import { PaymentMethod } from "../models/payment-method";

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodsService {

    constructor (private http: HttpClient, private endpointsService: EndpointsService) { }

    public getPaged(skip: number, take: number, name: string = null): Observable<PaymentMethod[]> {
        const url = `${this.endpointsService.apiUrl}/payment-methods?skip=${skip}&take=${take}&name=${name}`;
        return this.http.get<PaymentMethod[]>(url);
    }

    public getAll(): Observable<PaymentMethod[]> {
        const url = `${this.endpointsService.apiUrl}/payment-methods/all`;
        return this.http.get<PaymentMethod[]>(url);
    }

    public getById(id: string): Observable<PaymentMethod> {
        const url = `${this.endpointsService.apiUrl}/payment-methods/${id}`;
        return this.http.get<PaymentMethod>(url);
    }

    public create(paymentMethod: PaymentMethod): Observable<void> {
        const url = `${this.endpointsService.apiUrl}/payment-methods`;
        return this.http.post<void>(url, paymentMethod)
            .pipe(catchError(this.handleError));
    }

    public update(paymentMethod: PaymentMethod): Observable<void> {
        const url = `${this.endpointsService.apiUrl}/payment-methods/${paymentMethod.id}`;
        return this.http.put<void>(url, paymentMethod)
            .pipe(catchError(this.handleError));;
    }

    public remove(paymentMethod: PaymentMethod): Observable<void> {
        const url = `${this.endpointsService.apiUrl}/payment-methods/${paymentMethod.id}`;
        return this.http.delete<void>(url)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error);
    }
}