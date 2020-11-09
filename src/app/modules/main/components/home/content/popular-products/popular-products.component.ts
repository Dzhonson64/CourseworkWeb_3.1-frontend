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
    // $(document).ready(function() {
    //   $('.your-class').slick({
    //     arrows: true
    //   });
    // });
    $(document).ready(function() {
      $('.sd').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        items: 2,
        navText: ['<i class="fas fa-arrow-left"></i>',
          '<i class="fas fa-arrow-right"></i>'],
      });
    });
  }


}
