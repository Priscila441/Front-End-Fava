// src/app/core/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderPatchPaymethod } from '../models/orderPatchPaymethod.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:5054/api/Order';

  constructor(private http: HttpClient) {}

  createOrder(dto: OrderPatchPaymethod): Observable<{ mensaje: string; idOrder: number }> {
  return this.http.post<{ mensaje: string; idOrder: number }>(`${this.apiUrl}/create`, dto);
}


  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/all`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
