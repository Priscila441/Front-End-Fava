import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})


export class ProductService {
    //private readonly apiUrl = '/Product';
    private readonly apiUrl = environment.API_URL + '/Product';

    constructor(private http: HttpClient) {}

    getAllProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.apiUrl}/All`)
        //return this.http.get<Product[]>(`${environment.API_URL}${this.apiUrl}/All`)
    }

    getProductById(id : number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    create(product: Product): Observable<Product> {
      return this.http.post<Product>(this.apiUrl, product);
    }

    update(id: number, product: Product): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}?id=${id}`, product);
    }

    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}