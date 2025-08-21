// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart.model';
import { catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = 'http://localhost:5054/api/Cart'; 
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener carrito activo
  fetchCart() {
  this.http.get<Cart>(`${this.apiUrl}/active`)
    .pipe(
      catchError(() => of(null)) // si hay error, devuelve observable de null
    )
    .subscribe(cart => this.cartSubject.next(cart));
}


  // Añadir producto
  addProduct(productId: number, quantity = 1): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/add-product`, { productId, quantity });
  }

  // Eliminar carrito completo
  clearCart(): Observable<any> {
  return this.http.delete(`${this.apiUrl}`)
    .pipe(
      catchError(() => of({ deleted: false })) // si hay error, devolvemos objeto por defecto
    );
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
