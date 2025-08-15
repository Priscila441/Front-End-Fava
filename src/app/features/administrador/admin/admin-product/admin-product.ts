import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product.service'; 
import { Product } from '../../../../core/models/product.model';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin-product',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-product.html',
  styleUrl: './admin-product.css'
})
export class AdminProduct {
  private productService = inject(ProductService);
  products: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => this.products = res,
      error: (err) => console.error('Error loading products', err),
    });
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.delete(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
