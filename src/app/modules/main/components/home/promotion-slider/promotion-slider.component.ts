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
    var carousel = $(function() {
      // Owl Carousel
      var owl = $('.promotion-slider');
      owl.owlCarousel({
        items: 1,
        margin: 0,
        loop: true,
        nav: true,
        autoplay: true,
        navText: ['<i class="fas fa-chevron-left"></i>',
          '<i class="fas fa-chevron-right"></i>'],
      });
    });

    carousel.on('click', '.owl-item', function () {
      //получить индекс
      var click = $(this).index();
      //по клику листаем к слайду на который кликнули
      carousel.trigger( 'to.owl.carousel', [click] )
      // Или добавляем свою функцию вместо листания
    });
  }

}
