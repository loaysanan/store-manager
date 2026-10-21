import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
 
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = [...data];
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'An error occurred while loading products.';
        this.isLoading = false;
      }
    });
  }

  retryLoad(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.productService.refreshProducts().subscribe({
      next: (data) => {
        this.products = [...data];
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'An error occurred while loading products.';
        this.isLoading = false;
      }
    });
  }

  handleDeleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== productId);
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'Could not delete product.';
      }
    });
  }
}
