import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MainHeaderComponent } from '../header/main-header/main-header.component';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') btnRef: any;
  @ViewChild(MainHeaderComponent, { static: false })
  private counterComponent: MainHeaderComponent;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.counterComponent.menuComponent.drawer = this.btnRef;
  }

}
