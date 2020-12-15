import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatPaginator} from '@angular/material/paginator';
import {DecimalPipe} from '@angular/common';
import {TablePropertyProductService} from '../../../../services/table-property-product.service';
import {ProductService} from '../../../../services/product.service';
import {ProductDto} from '../../../../../../models/ProductDto';


// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA2: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];


@Component({
  selector: 'app-product-company',
  templateUrl: './product-company.component.html',
  styleUrls: ['./product-company.component.scss'],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outlined'}}],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({height: '0px', minHeight: '0'})),
  //     state('expanded', style({height: '*'})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],
})
export class ProductCompanyComponent implements OnInit, AfterViewInit {
  columnsToDisplay = ['id', 'name', 'price', 'actions'];
  dataSource;
  // expandedElement: PeriodicElement | null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private removeElem: ProductDto[] = [];

  ngAfterViewInit() {
    this.productService.getProducts().subscribe(value => {

      this.dataSource = new MatTableDataSource(value);
      this.translateMatPaginator(this.paginator);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });


  }

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {


  }

  addRow() {
    console.log(this.dataSource.data);
    let defaultObj: PeriodicElement = {
      position: 0, name: '000', weight: 0, symbol: '000'
    };
    defaultObj.position = this.dataSource.data.length + 1;
    this.dataSource.data.reverse().push(defaultObj);
    this.dataSource.data.reverse();
    this.ngOnInit();

  }

  editProduct() {

  }

  deleteProduct(elem: ProductDto) {
    console.log(elem);
    this.removeElem.push(elem);
    this.productService.deleteProducts(elem).subscribe(value => {
      this.ngOnInit();
      this.ngAfterViewInit();
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

  isContainRemoveArr(elem: PeriodicElement): boolean {
    // for (let i = 0; i < this.removeElem.length; i++) {
    //   if (this.removeElem[i].position == elem.position) {
    //     return true
    //   }
    // }
    console.log(elem);
    return false;
  }

  insertComponent(index: any) {
    console.log(index);
  }
}
