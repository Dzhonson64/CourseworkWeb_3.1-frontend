import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMainComponent } from './home-main/home-main.component';
import { PromotionSliderComponent } from './promotion-slider/promotion-slider.component';



@NgModule({
  declarations: [HomeMainComponent, PromotionSliderComponent],
  imports: [
    CommonModule
  ],
  exports: [HomeMainComponent, PromotionSliderComponent]
})
export class HomeModule { }
