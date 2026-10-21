import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = Number(idParam);

      if (!idParam || isNaN(id) || id <= 0) {
        this.product = null;
        this.isLoading = false;
        this.errorMessage = `Invalid Product ID "${idParam}". Product not found.`;
        return;
      }

      this.fetchProduct(id);
    });
  }

  fetchProduct(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.product = null;

    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'Product not found.';
        this.isLoading = false;
      }
    });
  }
}
