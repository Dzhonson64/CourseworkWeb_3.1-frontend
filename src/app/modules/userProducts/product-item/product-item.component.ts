import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../profile/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductDto} from '../../../models/ProductDto';
import {PropertyProduct} from '../../../models/PropertyProduct';
import {FillPropertyDto} from '../../../models/FillPropertyDto';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  product: ProductDto;
  property: FillPropertyDto[] = [];
  value: number = 1;
  constructor(
    private productService: ProductService,
              private router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.productService.getProductById(params['product']).subscribe(value => {
        this.product = new ProductDto();
        this.product.price = value.price;
        this.product.name = value.name;
        this.product.description = value.description;
        this.product.catalogId = value.catalogId;
        this.product.id = value.id;
        this.productService.getAllPropertyByProduct(params['product']).subscribe(value1 => {
          let property = new FillPropertyDto();
         console.log(value1)
        })
      })

    });
  }

}
