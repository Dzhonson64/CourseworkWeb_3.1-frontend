import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') btnRef: any;
  @ViewChild(HeaderComponent, { static: false })
  private counterComponent: HeaderComponent;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.counterComponent.menuComponent.drawer = this.btnRef;
  }

}
