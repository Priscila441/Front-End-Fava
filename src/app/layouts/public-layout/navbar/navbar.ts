import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../core/services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

cartCount = 0;
constructor(private cartService: CartService, public authService: AuthService, private router:Router) {}
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
  logout(): void {
  this.authService.clearAuth(); // borra token y user
  this.router.navigate(['/home']); // redirige al home
}

}
