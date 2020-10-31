import {Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-promotion-slider',
  templateUrl: './promotion-slider.component.html',
  styleUrls: ['./promotion-slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PromotionSliderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    $(function() {
      // Owl Carousel
      var owl = $('.owl-carousel');
      owl.owlCarousel({
        items: 3,
        margin: 0,
        loop: true,
        nav: true,
        autoplay: true
      });
    });
  }

}
