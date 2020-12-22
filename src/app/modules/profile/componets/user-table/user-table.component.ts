import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ProfileService} from '../../services/profile.service';
import {MatTableDataSource} from '@angular/material/table';
import {ThemePalette} from '@angular/material/core';
import {UserType} from '../../../../models/type/UserType';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, AfterViewInit {
  columnsToDisplay = ['id', 'username', 'password', 'type',  'actions'];
  dataSource;
  typeUser = UserType;
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  this.profileService.getUsersAndProviders().subscribe(value => {

      this.dataSource = new MatTableDataSource(value);
      this.translateMatPaginator(this.paginator);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);
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

  deleteUser(element: any) {
    this.profileService.deleteUsersAndProviders(element.id).subscribe(value => {
      this.ngOnInit();
    })
  }

  select(id: number) {
    console.log(this.dataSource.data);
  }
}
