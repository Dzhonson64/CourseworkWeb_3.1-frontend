import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ProfileService} from '../../../../services/profile.service';
import {ProductService} from '../../../../services/product.service';
import {OrderResponseDto} from '../../../../../../models/OrderResponseDto';
import {OrderProductDto} from '../../../../../../models/OrderProductDto';
import {ProductDto} from '../../../../../../models/ProductDto';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  columnsToDisplay = ['name', 'price', 'amount', "date", "order_id"];
  dataSource;
  orders: OrderResponseDto[] = [];
  orderProducts: ProductDto[] = [];
  // expandedElement: PeriodicElement | null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.productService.findAllByProvider(Number(localStorage.getItem('userId'))).subscribe(value => {

      this.orders = value;
      for (let i of value) {
        for (let j of i.orderProductList) {
          this.orderProducts.push(j.product);
        }
      }
      console.log(this.orderProducts);
      this.dataSource = new MatTableDataSource(this.orderProducts);
      this.translateMatPaginator(this.paginator);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(value)
    });
  }

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.itemsPerPageLabel = 'Кол-во элементов на странице';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} из ${length}`;
    };
  }

  public  findOrder(productId: number):OrderResponseDto {
    return  this.orders.find(value => value.orderProductList.find(value1 => value1.product.id == productId));
  }

  public  findOrderProduct(productId: number):OrderProductDto {
    return this.findOrder(productId).orderProductList.find(value1 => value1.product.id == productId);
  }

}
