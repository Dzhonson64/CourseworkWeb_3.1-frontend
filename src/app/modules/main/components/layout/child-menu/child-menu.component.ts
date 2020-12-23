import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CatalogDto} from '../../../../../models/CatalogDto';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-child-menu',
  templateUrl: './child-menu.component.html',
  styleUrls: ['./child-menu.component.scss']
})
export class ChildMenuComponent implements OnInit {
  @Input() rooItemMenu:CatalogDto[];

  @ViewChild('childMenu')
  public childMenu;
  constructor() { }

  ngOnInit(): void {
  }



}
