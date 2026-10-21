import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { TruncatePipe } from '../pipes/truncate.pipe';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    AddProductComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ProductListComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    AddProductComponent
  ]
})
export class ProductsModule {}
