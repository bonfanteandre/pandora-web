import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

    public getById(id: string): Observable<PaymentMethod> {
        const url = `${this.endpointsService.apiUrl}/payment-methods/${id}`;
        return this.http.get<PaymentMethod>(url);
    }

    public create(plan: PaymentMethod): Observable<void> {
        const url = `${this.endpointsService.apiUrl}/payment-methods`;
        return this.http.post<void>(url, plan);
    }

    public update(plan: PaymentMethod): Observable<void> {
        const url = `${this.endpointsService.apiUrl}/payment-methods/${plan.id}`;
        return this.http.put<void>(url, plan);
    }

    public remove(plan: PaymentMethod): Observable<void> {
        const url = `${this.endpointsService.apiUrl}/payment-methods/${plan.id}`;
        return this.http.delete<void>(url);
    }
}