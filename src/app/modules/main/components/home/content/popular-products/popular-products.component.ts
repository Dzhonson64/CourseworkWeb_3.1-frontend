import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductService} from '../../../../../profile/services/product.service';
import {ProductDto} from '../../../../../../models/ProductDto';

declare var $: any;

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopularProductsComponent implements OnInit {
  public cards = [1, 2];
  products: ProductDto[];
  productFirst: ProductDto;

  constructor(private productsService: ProductService) {
  }

  ngOnInit(): void {
    // $(document).ready(function() {
    //   $('.your-class').slick({
    //     arrows: true
    //   });
    // });

    this.productsService.getLastProducts().subscribe(value => {
      this.products = value;
      this.productFirst = this.products[2];
      console.log(this.products[1]);
    });



    // $(document).ready(function() {
    //   $('.sd').owlCarousel({
    //     loop: true,
    //     margin: 10,
    //     nav: true,
    //     dots: false,
    //     items: 1,
    //     navText: ['<i class="fas fa-arrow-left"></i>',
    //       '<i class="fas fa-arrow-right"></i>'],
    //   });
    // });
  }


}
