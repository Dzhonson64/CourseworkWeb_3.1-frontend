import {Component, OnInit, ViewEncapsulation} from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopularProductsComponent implements OnInit {
  public cards = [1, 2];

  constructor() {
  }

  ngOnInit(): void {

    var carousel = $(function() {
      // Owl Carousel
      var owl = $('.popular-product-slider');
      owl.owlCarousel({
        items: 6,
        margin: 15,
        loop: true,
        nav: true,
        dots: false,
        autoplay: true,
        navText: ['<i class="fas fa-chevron-left"></i>',
          '<i class="fas fa-chevron-right"></i>'],
      });
    });

    carousel.on('click', '.owl-item', function() {
      //получить индекс
      var click = $(this).index();
      //по клику листаем к слайду на который кликнули
      carousel.trigger('to.owl.carousel', [click]);
      // Или добавляем свою функцию вместо листания
    });
  }

  public counter(i: number) {
    return new Array(i);
  }

}
