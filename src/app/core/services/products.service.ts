import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { EndpointsService } from "src/app/shared/services/endpoints.service";
import { OperationResult } from "../models/common/operation-result";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    
    constructor (private http: HttpClient, private endpointsService: EndpointsService) { }

    public getPaged(skip: number, take: number, name: string = null): Observable<Product[]> {
        const url = `${this.endpointsService.apiUrl}/products?skip=${skip}&take=${take}&name=${name}`;
        return this.http.get<Product[]>(url);
    }

    public getById(id: string): Observable<Product> {
        const url = `${this.endpointsService.apiUrl}/products/${id}`;
        return this.http.get<Product>(url);
    }

    public create(product: Product): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/products`;
        return this.http.post<OperationResult>(url, product)
            .pipe(catchError(this.handleError));
    }

    public update(product: Product): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/products/${product.id}`;
        return this.http.put<OperationResult>(url, product)
            .pipe(catchError(this.handleError));
    }

    public remove(product: Product): Observable<OperationResult> {
        const url = `${this.endpointsService.apiUrl}/products/${product.id}`;
        return this.http.delete<OperationResult>(url)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error);
    }

}