import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {UserType} from '../../../../models/type/UserType';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LeftMenuComponent implements OnInit, AfterViewInit {

  listMenu: string[] = ['', 'Покупки'];
  type:string;
  userId:number;
  isAdmin:boolean;
  t = UserType

  constructor(private r: Router) { }

  ngOnInit(): void {
    this.type = localStorage.getItem("type");
    this.userId = Number(localStorage.getItem("userId"));
    if (localStorage.getItem("isAdmin") !=null || localStorage.getItem("isAdmin") != undefined ) {
      this.isAdmin = true;
    }
  }

  ngAfterViewInit(): void {
  }

}
