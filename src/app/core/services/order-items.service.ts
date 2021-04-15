import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { EndpointsService } from "src/app/shared/services/endpoints.service";
import { OperationResult } from "../models/common/operation-result";
import { OrderItem } from "../models/order-item";

@Injectable({
    providedIn: 'root'
})
export class OrderItemsService {

    constructor (private http: HttpClient, private endpointsService: EndpointsService) { }

    public create(orderItem: OrderItem): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/order-items`;
        return this.http.post<OperationResult>(url, orderItem)
            .pipe(catchError(this.handleError));
    }

    public update(orderItem: OrderItem): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/order-items/${orderItem.id}`;
        return this.http.put<OperationResult>(url, orderItem)
            .pipe(catchError(this.handleError));
    }

    public remove(orderItem: OrderItem): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/order-items/${orderItem.id}`;
        return this.http.delete<OperationResult>(url)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error);
    }
}