import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../core/models/cart.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

cartCount = 0;
constructor(private cartService: CartService) {}
ngOnInit() {
  this.cartService.cart$.subscribe(cart => {
    this.cartCount = cart
      ? cart.cartDetail.reduce((acc, item) => acc + item.quantity, 0)
      : 0;
  });

  this.cartService.fetchCart();
}

  showCategoryDropdown = false;

  toggleCategoryDropdown() {
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }

  closeDropdown() {
    this.showCategoryDropdown = false;
  }
}
