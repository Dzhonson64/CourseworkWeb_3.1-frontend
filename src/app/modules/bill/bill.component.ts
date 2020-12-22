import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {OrderProductDto} from '../../models/OrderProductDto';
import * as moment from 'moment';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  subtotal: number = 0;
  shipping: number = 300;
  taxes: number = 13;
  total: number = 0;
  date:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: OrderProductDto[]) { }

  ngOnInit(): void {
    console.log(this.data)
    this.getTotal();
    this.date = this.getDateNow();
  }

  private getTotal() {
    this.getSubTotal();
    this.total = this.shipping + this.subtotal;
    this.total += this.taxes / 100 * this.total;
  }

  private getSubTotal() {
    for (let order of this.data) {

      this.subtotal += order.amount * order.product.price;
    }
  }

  public getNumBill() {
    let max = 100000;
    let min = 10000;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public getDateNow():string {
    moment.updateLocale('ru', null);
    return moment().format("DD.MM.YYYY")
  }

  close() {
    console.log("T")
  }
}
