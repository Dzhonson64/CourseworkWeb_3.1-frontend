import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContentComponent} from './content.component';
import {PopularProductsComponent} from './popular-products/popular-products.component';
import { AdvantagesComponent } from './advantages/advantages.component';
import { BrandsComponent } from './brands/brands.component';
import {MatFieldCommonModule} from '../../../../common-modules/mat-field/mat-field-common.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ContentComponent, PopularProductsComponent, AdvantagesComponent, BrandsComponent],
  imports: [
    CommonModule,
    MatFieldCommonModule,
    RouterModule
  ],
  exports: [ContentComponent, PopularProductsComponent]
})
export class ContentModule { }
