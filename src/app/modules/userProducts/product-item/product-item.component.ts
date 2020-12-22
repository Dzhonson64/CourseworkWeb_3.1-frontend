import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../profile/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductDto} from '../../../models/ProductDto';
import {PropertyProduct} from '../../../models/PropertyProduct';
import {FillPropertyDto} from '../../../models/FillPropertyDto';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OrderDto} from '../../../models/OrderDto';
import {HttpClient} from '@angular/common/http';
import {HeaderTopComponent} from '../../main/components/header/header-top/header-top.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, AfterViewInit {
  product: ProductDto;
  property: FillPropertyDto[] = [];
  value: number = 1;
  @ViewChild(HeaderTopComponent, {static: false}) header: HeaderTopComponent;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.productService.getProductById(params['product']).subscribe(value => {
        this.product = new ProductDto();
        this.product.price = value.price;
        this.product.name = value.name;
        this.product.description = value.description;
        this.product.catalogId = value.catalogId;
        this.product.id = value.id;
        console.log(this.product.catalogId);
        this.productService.getAllPropertyByProduct(params['product']).subscribe(value1 => {
          let property = new FillPropertyDto();
          this.property = value1;

        });
      });

    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  order() {
    this.productService.order().subscribe(value => {
      let userId = localStorage.getItem('userId');
      let order = new OrderDto();
      order.amount = this.value;
      order.productId = this.product.id;
      order.userId = Number(userId);
      let oldAmountPurchase = Number(localStorage.getItem("amountPurchase"))
      localStorage.setItem("amountPurchase", String(oldAmountPurchase + 1))

      this.http.post(`/api/courseworkWeb/user/order/bucket/${value}`, order).subscribe(value1 => {
        // this.header.amountPurchase = oldAmountPurchase + 1;
        // console.log(this.header.amountPurchase)
        this.openSnackBar('Товар добален в корзину', "Закрыть");
      });
    });
  }

  ngAfterViewInit(): void {
    console.log(this.header)
  }
}
