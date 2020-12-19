import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../profile/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductDto} from '../../../models/ProductDto';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit {
  productList: ProductDto[] = [];
  autoTicks = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 10;
  thumbLabel = true;
  value = 0;
  tickInterval = 1;


  constructor(private productService: ProductService,
              private router: Router,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {

      console.log(params['catalog']);
      this.productService.getAllProductByCatalogId(params['catalog']).subscribe(value => {
        for (let i of value) {
          let product = new ProductDto();
          product.name = i.name;
          product.description = i.description;
          product.price = i.price;
          product.catalogId = i.catalogId;
          product.id = i.id;
          this.productList.push(product)
        }

      })
    });
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

}
