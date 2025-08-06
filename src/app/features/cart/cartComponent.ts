import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { Cart } from '../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']  // Corregido: era `styleUrl`
})
export class CartComponent implements OnInit {

  cart: Cart | null = null;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
    this.cartService.fetchCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) return;
    this.cartService.updateQuantity(productId, quantity).subscribe(() => {
      this.cartService.fetchCart();
    });
  }

  removeProduct(productId: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.cartService.removeProduct(productId).subscribe(() => {
        this.cartService.fetchCart();
      });
    }
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.cartService.fetchCart();
    });
  }

  confirmOrder(): void {
  alert('Compra generada con éxito');
  this.clearCart(); // Vacía el carrito
  this.router.navigate(['/home']); 
  }

}
