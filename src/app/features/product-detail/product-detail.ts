import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule as formsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, formsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (prod) => this.product = prod,
        error: () => this.router.navigate(['/home'])
      });
    }
  }

  addToCart(productId: number) {
    this.cartService.addProduct(productId, 1).subscribe({
      next: () => {
        this.cartService.fetchCart(); 
      },
      error: (err) => console.error(err),
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
