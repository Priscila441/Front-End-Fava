import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  products: Product[] = [];

  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res); // para depurar
        this.products = res;
      },
      error: (err) => console.error('Error al cargar productos', err)
    });
  }
}
