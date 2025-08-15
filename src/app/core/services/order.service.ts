import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderPatchPaymethod } from '../models/orderPatchPaymethod.model'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:5054/api/Order'; 

  constructor(private http: HttpClient) {}

  createOrder(dto: OrderPatchPaymethod): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/create`, dto);
  }

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }
}
