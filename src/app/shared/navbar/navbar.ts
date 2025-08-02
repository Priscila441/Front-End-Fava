import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  cartCount = 0;

  // Simulación: podrías tener una función para incrementar el carrito
  // En un proyecto real esto vendría de un servicio compartido
  addToCart() {
    this.cartCount++;
  }
}
