import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import * as moment from 'moment';
import {OrderProductDto} from '../../../../models/OrderProductDto';

// @ts-ignore
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit, AfterViewInit {
  columnsToDisplay = ['name', 'image', 'date', 'price', 'amount', 'order_id'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  now = moment();

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {


  }

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.itemsPerPageLabel = 'Кол-во элементов на странице';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} из ${length}`;
    };
  }

  ngAfterViewInit() {
    this.profileService.getAllOrderProduct(Number(localStorage.getItem('userId'))).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
      this.translateMatPaginator(this.paginator);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);
    });


  }



}
