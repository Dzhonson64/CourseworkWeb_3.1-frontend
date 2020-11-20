import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LeftMenuComponent implements OnInit, AfterViewInit {

  listMenu: string[] = ['', 'Покупки'];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
