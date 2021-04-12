import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { EndpointsService } from "src/app/shared/services/endpoints.service";
import { Address } from "../models/address";
import { OperationResult } from "../models/common/operation-result";

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    
    constructor (private http: HttpClient, private endpointsService: EndpointsService) { }

    public create(address: Address): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/addresses`;
        return this.http.post<OperationResult>(url, address)
            .pipe(catchError(this.handleError));
    }

    public update(address: Address): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/addresses/${address.id}`;
        return this.http.put<OperationResult>(url, address)
            .pipe(catchError(this.handleError));
    }

    public remove(address: Address): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/addresses/${address.id}`;
        return this.http.delete<OperationResult>(url)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error);
    }
}