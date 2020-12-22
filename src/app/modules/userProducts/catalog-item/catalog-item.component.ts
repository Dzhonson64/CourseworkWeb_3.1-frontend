import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProductService} from '../../profile/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductDto} from '../../../models/ProductDto';
import {FilterProductsService} from '../../profile/services/filter-products.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit, AfterViewInit {
  productList: ProductDto[] = [];
  autoTicks = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 10;
  thumbLabel = true;
  value = 0;
  tickInterval = 1;
  controlSort: FormControl = new FormControl(1,);
  controlMin: FormControl ;
  controlMax: FormControl;
  minPrice: number
  maxPrice: number
  copyProductList : ProductDto[];

  constructor(private productService: ProductService,
              private router: Router,
              private filterProductsService: FilterProductsService,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {

  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  filter() {
    if (this.copyProductList == undefined) {
      this.copyProductList = Array.from(this.productList);
    }
    this.productList =  this.copyProductList;
    if (this.controlSort.value == 1) {
      this.productList.sort((a, b) => a.price - b.price);
    } else if (this.controlSort.value == 2) {
      this.productList.sort((a, b) => b.price - a.price);
    } else if (this.controlSort.value == 3) {
      this.productList.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }else if (a.name < b.name) {
          return -1;
        }else{
          return 0;
        }
      });
    }


    this.productList = this.productList.filter(value1 => value1.price >= this.controlMin.value && value1.price <= this.controlMax.value)
    //this.productList = a;

  }

  ngAfterViewInit(): void {
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
          this.productList.push(product);
        }

        this.productList.sort((a, b) => a.price - b.price);
        this.minPrice = this.productList[0].price;
        this.maxPrice = this.productList[this.productList.length - 1].price;
        this.controlMax = new FormControl(this.maxPrice);
        this.controlMin = new FormControl(this.minPrice);
      });
    });
  }


}
