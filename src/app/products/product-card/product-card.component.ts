import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() deleteRequest = new EventEmitter<number>();

  onDelete(event: Event): void {
    event.stopPropagation();
    this.deleteRequest.emit(this.product.id);
  }
}
