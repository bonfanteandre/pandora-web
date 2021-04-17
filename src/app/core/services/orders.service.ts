import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { EndpointsService } from "src/app/shared/services/endpoints.service";
import { OperationResult } from "../models/common/operation-result";
import { Order } from "../models/order";

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    
    constructor (private http: HttpClient, private endpointsService: EndpointsService) { }

    public getPaged(skip: number, take: number, name: string = null): Observable<Order[]> {
        const url = `${this.endpointsService.apiUrl}/orders?skip=${skip}&take=${take}&name=${name}`;
        return this.http.get<Order[]>(url).pipe(map(os => os.map(o => new Order(o))));
    }

    public getById(id: string): Observable<Order> {
        const url = `${this.endpointsService.apiUrl}/orders/${id}`;
        return this.http.get<Order>(url).pipe(map(o => new Order(o)));
    }

    public create(order: Order): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/orders`;
        return this.http.post<OperationResult>(url, order)
            .pipe(catchError(this.handleError));
    }

    public update(order: Order): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/orders/${order.id}`;
        return this.http.put<OperationResult>(url, order)
            .pipe(catchError(this.handleError));
    }

    public finish(order: Order): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/orders/${order.id}/finish`;
        return this.http.put<OperationResult>(url, null)
            .pipe(catchError(this.handleError));
    }

    public deliver(order: Order): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/orders/${order.id}/deliver`;
        return this.http.put<OperationResult>(url, null)
            .pipe(catchError(this.handleError));
    }

    public cancel(order: Order): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/orders/${order.id}/cancel`;
        return this.http.put<OperationResult>(url, null)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error);
    }
}