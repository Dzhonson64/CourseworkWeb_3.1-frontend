import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeMainComponent} from './home-main.component';
import {PromotionSliderComponent} from './promotion-slider/promotion-slider.component';
import {ContentModule} from './content/content.module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [HomeMainComponent, PromotionSliderComponent],
  imports: [
    CommonModule, ContentModule
  ],
  exports: [HomeMainComponent, PromotionSliderComponent]
})
export class HomeModule { }
