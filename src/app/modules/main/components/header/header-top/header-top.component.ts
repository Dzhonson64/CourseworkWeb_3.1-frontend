import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserType} from '../../../../../models/type/UserType';
import {MatTableDataSource} from '@angular/material/table';
import {ProductService} from '../../../../profile/services/product.service';
import {ProductDto} from '../../../../../models/ProductDto';
import {Data} from '../../../../../models/organisation/Data';
import {FormControl} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
// export interface User {
//   name: string;
// }
@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {
  columnsToDisplay = ['name'];
  productAll: ProductDto[] = [];
  dataSource;
  selectRoute: string;
  myControl = new FormControl();
  value = '';
  changesRef: ChangeDetectorRef;
  isShow: boolean;
  // filteredOptions: Observable<ProductDto[]>;

  // options: User[] = [
  //   {name: 'Mary'},
  //   {name: 'Shelley'},
  //   {name: 'Igor'}
  // ];
  filteredOptions: Observable<ProductDto[]>;

  constructor(private cdRef: ChangeDetectorRef, private productsService: ProductService, private route: Router) {
    this.changesRef = cdRef;
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(value => {
      this.productAll = value;
      this.dataSource = new MatTableDataSource(this.productAll);
      this.isShow = true;
    });
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : value.name),
    //     map(name => name ? this._filter(name) : this.productAll.slice())
    //   );


    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.productAll.slice())
      );
  }

  displayFn(user: ProductDto): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): ProductDto[] {
    const filterValue = name.toLowerCase();

    return this.productAll.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // displayFn(obj: ProductDto): string {
  //   return obj.name ? obj.name : '';
  // }
  //
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   console.log(filterValue);
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   console.log(this.dataSource.data);
  //
  // }


//   private _filter(name: string): ProductDto[] {
//     const filterValue = name.toLowerCase();
// console.log(this.productAll.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0))
//     return this.productAll.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
//   }

  isShows(endpoint: string) {
    this.selectRoute = endpoint;
    this.isShow = false;
  }

  send() {
    let routing = '/prod/' + this.selectRoute;
    this.route.navigate([routing]);
  }
}
