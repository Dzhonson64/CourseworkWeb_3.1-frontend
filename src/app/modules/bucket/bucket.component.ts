import {Component, OnInit} from '@angular/core';
import {ProductService} from '../profile/services/product.service';
import {OrderProductDto} from '../../models/OrderProductDto';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {BillComponent} from '../bill/bill.component';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'quantity', 'total_price', 'remove'];
  dataSource;
  orderList: OrderProductDto[] = [];
  id: number;
  subtotal: number = 0;
  shipping: number = 300;
  taxes: number = 13;
  total: number = 0;
  error: string;

  constructor(private product: ProductService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.product.getOrders().subscribe(value => {
      this.orderList = value.orderProductList;
      this.id = value.id;
      this.dataSource = new MatTableDataSource(this.orderList);
      this.getTotal();
    });

  }
  openDialog() {
    this.dialog.open(BillComponent, {
      data: this.orderList
    });
  }
  resetField() {
    this.total = 0;
    this.subtotal = 0;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  private getSubTotal() {
    for (let order of this.orderList) {

      this.subtotal += order.amount * order.product.price;
    }
  }

  private getTotal() {
    this.getSubTotal();
    this.total = this.shipping + this.subtotal;
    this.total += this.taxes / 100 * this.total;
  }

  buy() {

    this.product.buyOrder(this.id, this.total).subscribe(
      data => {
        this.openSnackBar('Заказ успешно оформлен', "Закрыть");
        this.orderList = []
      },
      error => {
        this.openSnackBar(error.error.message, 'Закрыть');

      }
    );
  }

  delete(idProduct: number) {
    this.product.deleteFromOrder(this.id, idProduct).subscribe(value => {
      this.resetField()
      this.openSnackBar("Товар успешно удалён", 'Закрыть');
      this.ngOnInit()
    })
  }
}
