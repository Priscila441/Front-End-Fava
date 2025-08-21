// src/app/features/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { Cart } from '../../core/models/cart.model';
import { OrderPatchPaymethod } from '../../core/models/orderPatchPaymethod.model';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  showPaymentOptions = false;
  selectedPaymentMethod: string | null = null;
  showOrderModal = false;
  createdOrderMessage = '';
  currentOrder: Order | null = null;


  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
    this.cartService.fetchCart();
  }

  // Botón Generar Orden
  confirmOrder(): void {
    if (!this.authService.isLoggedIn()) {
      const returnUrl = this.router.url;
      this.router.navigate(['/auth'], { queryParams: { returnUrl } });
      return;
    }
    this.showPaymentOptions = true;
  }

 
  cancelOrder(): void {
    this.showPaymentOptions = false;
    this.selectedPaymentMethod = null;
  }

  createOrder(): void {
    if (!this.selectedPaymentMethod) return;

    const dto: OrderPatchPaymethod = { PaymentMethod: this.selectedPaymentMethod };

    this.orderService.createOrder(dto).subscribe({
      next: (res) => {
        // una vez creada, pedir la orden completa
        this.orderService.getOrderById(res.idOrder).subscribe(order => {
          console.log(order);
          this.currentOrder = order;
          this.showPaymentOptions = false;
          this.showOrderModal = true;
        });
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.mensaje || '❌ Error al crear la orden');
      }
    });
  }

  // Botones del modal
  acceptOrder(): void {
    this.clearCart();
    this.router.navigate(['/home']);
    this.showOrderModal = false;
  }

  cancelModalOrder(): void {
    this.clearCart(); // o no limpiar si querés mantener
    this.router.navigate(['/home']);
    this.showOrderModal = false;
  }


  // Limpiar carrito
  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.cartService.fetchCart();
    });
  }

  updateQuantity(productId: number, newQuantity: number): void {
  if (!this.cart) return;
  this.cartService.updateQuantity(productId, newQuantity).subscribe(() => {
    this.cartService.fetchCart();
  });
}

removeProduct(productId: number): void {
  if (!this.cart) return;
  this.cartService.removeProduct(productId).subscribe(() => {
    this.cartService.fetchCart();
  });
}
  
}
