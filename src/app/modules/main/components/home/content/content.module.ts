import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContentComponent} from './content.component';
import {PopularProductsComponent} from './popular-products/popular-products.component';
import { AdvantagesComponent } from './advantages/advantages.component';
import { BrandsComponent } from './brands/brands.component';



@NgModule({
  declarations: [ContentComponent, PopularProductsComponent, AdvantagesComponent, BrandsComponent],
  imports: [
    CommonModule
  ],
  exports: [ContentComponent, PopularProductsComponent]
})
export class ContentModule { }
