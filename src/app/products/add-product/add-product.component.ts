import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  title = '';
  price: number | null = null;
  description = '';
  category = '';
  image = '';
  stockCount = 10;

  isSubmitting = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  isFormValid(): boolean {
    return (
      this.title.trim().length > 0 &&
      this.price !== null &&
      this.price > 0 &&
      this.description.trim().length > 0 &&
      this.category.trim().length > 0 &&
      this.image.trim().length > 0
    );
  }

  onSubmit(): void {
    if (!this.isFormValid() || this.price === null) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.productService.addProduct({
      title: this.title.trim(),
      price: Number(this.price),
      description: this.description.trim(),
      category: this.category.trim(),
      image: this.image.trim(),
      count: Number(this.stockCount)
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/products']);
      },
      error: (err: Error) => {
        this.isSubmitting = false;
        this.errorMessage = err.message || 'Failed to save product. Please try again.';
      }
    });
  }
}
