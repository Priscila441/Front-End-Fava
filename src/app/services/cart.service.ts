// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart, CartDetail } from '../core/models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = 'https://tu-api.com/api/cart'; // Cambiá por tu URL real
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener carrito activo
  fetchCart() {
    this.http.get<Cart>(`${this.apiUrl}/active`).subscribe({
      next: (cart) => this.cartSubject.next(cart),
      error: () => this.cartSubject.next(null),
    });
  }

  // Añadir producto
  addProduct(productId: number, quantity = 1): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/add-product`, { productId, quantity });
  }

  // Eliminar carrito completo
  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}`);
  }

  // Actualizar cantidad en detalle
  updateQuantity(productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}detail`, { productId, quantity });
  }

  // Eliminar detalle por productId
  removeProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}detail/cart-detail/${productId}`);
  }
}
