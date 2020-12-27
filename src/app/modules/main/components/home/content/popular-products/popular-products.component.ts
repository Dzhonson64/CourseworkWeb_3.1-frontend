import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductService} from '../../../../../profile/services/product.service';
import {ProductDto} from '../../../../../../models/ProductDto';
import {MatTableDataSource} from '@angular/material/table';
import {CatalogDto} from '../../../../../../models/CatalogDto';

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



  // ngOnInit(): void {
  //   // $(document).ready(function() {
    //   $('.your-class').slick({
    //     arrows: true
    //   });
    // });

    this.productsService.getLastProducts().subscribe(value => {
      this.products = value;
      console.log(value);
      this.productFirst = this.products[2];

    });





  }



}
