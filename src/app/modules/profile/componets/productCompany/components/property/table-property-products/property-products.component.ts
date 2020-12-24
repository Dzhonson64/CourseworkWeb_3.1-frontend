import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {PeriodicElement} from '../../product-company/product-company.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {CatalogTreeService} from '../../../../../services/catalog-tree.service';
import {CatalogDto} from '../../../../../../../models/CatalogDto';
import {ContainerPropertiesComponent} from '../container-properties/container-properties.component';
import {TablePropertyProductService} from '../../../../../services/table-property-product.service';
import {PropertyProductComponent} from '../property-product/property-product.component';

@Component({
  selector: 'app-property-products',
  templateUrl: './property-products.component.html',
  styleUrls: ['./property-products.component.scss'],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outlined'}}],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PropertyProductsComponent implements OnInit {
  columnsToDisplay = ['name', 'actions'];
  DATA: CatalogDto[] = [];
  dataSource = new MatTableDataSource(this.DATA);
  expandedElement: PeriodicElement | null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  value = '';
  changeDetectorRef: ChangeDetectorRef;
  ngAfterViewInit() {
    this.translateMatPaginator(this.paginator);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private catalogTreeService: CatalogTreeService,
              private propertyProductService: TablePropertyProductService,
              private cdRef: ChangeDetectorRef) {
    this.changeDetectorRef = cdRef;
  }

  ngOnInit(): void {

    this.catalogTreeService.getCatalogLast().subscribe(value => {
      this.DATA = value;
      console.log(this.DATA);
      this.dataSource = new MatTableDataSource(this.DATA);
    });



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addRow() {


  }

  editProduct() {

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
    // console.log(this.removeElem);
    // for (let i = 0; i < this.removeElem.length; i++) {
    //   console.log(this.removeElem[i]);
    //   if (this.removeElem[i].position == elem.position) {
    //     return true;
    //   }
    // }
     return false;
  }

  save() {
    console.log(this.dataSource)
    this.propertyProductService.amountProperty = 0;
    this.propertyProductService.savePropertyProduct().subscribe(value1 => {
      this.ngOnInit()
    });
  }
}
