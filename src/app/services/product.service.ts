import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private localProducts: Product[] = [];
  private isLoaded = false;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    if (this.isLoaded) {
      return of(this.localProducts);
    }

    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap((products) => {
        this.localProducts = products.map((p, index) => ({
          ...p,
          // Make one product have 0 stock (rating.count = 0) so [ngClass]/[ngStyle] out-of-stock highlight is clearly visible
          rating: index === 0 ? { ...p.rating, count: 0 } : p.rating,
          createdAt: new Date()
        }));
        this.isLoaded = true;
      }),
      map(() => this.localProducts),
      catchError(() => {
        return throwError(() => new Error('Failed to load products from the server. Please check your internet connection and try again.'));
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    if (!id || isNaN(id) || id <= 0) {
      return throwError(() => new Error('Invalid product ID requested.'));
    }

    const existing = this.localProducts.find(p => p.id === id);
    if (existing) {
      return of(existing);
    }

    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      map((product) => {
        if (!product || !product.id) {
          throw new Error('Product not found.');
        }
        return {
          ...product,
          createdAt: product.createdAt || new Date()
        };
      }),
      catchError(() => {
        return throwError(() => new Error(`Product with ID #${id} was not found or could not be loaded.`));
      })
    );
  }

  addProduct(newProductData: Omit<Product, 'id' | 'rating' | 'createdAt'> & { count?: number }): Observable<Product> {
    const payload = {
      title: newProductData.title,
      price: newProductData.price,
      description: newProductData.description,
      image: newProductData.image,
      category: newProductData.category
    };

    return this.http.post<any>(this.apiUrl, payload).pipe(
      map((response) => {
        const nextId = this.localProducts.length > 0
          ? Math.max(...this.localProducts.map(p => p.id)) + 1
          : (response?.id || 21);

        const createdProduct: Product = {
          id: nextId,
          title: newProductData.title,
          price: Number(newProductData.price),
          description: newProductData.description,
          category: newProductData.category,
          image: newProductData.image,
          rating: {
            rate: 5.0,
            count: newProductData.count !== undefined ? Number(newProductData.count) : 15
          },
          createdAt: new Date()
        };

        this.localProducts.unshift(createdProduct);
        return createdProduct;
      }),
      catchError(() => {
        return throwError(() => new Error('Failed to add the product. Please verify your connection and try again.'));
      })
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.localProducts = this.localProducts.filter(p => p.id !== id);
      }),
      map(() => void 0),
      catchError(() => {
        // Still remove locally if needed or propagate error
        return throwError(() => new Error('Failed to delete product. Please check your connection.'));
      })
    );
  }

  refreshProducts(): Observable<Product[]> {
    this.isLoaded = false;
    return this.getProducts();
  }
}
