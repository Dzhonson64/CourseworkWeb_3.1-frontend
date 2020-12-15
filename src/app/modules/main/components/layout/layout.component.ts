import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MainHeaderComponent } from '../header/main-header.component';
import {CatalogTreeService} from '../../../profile/services/catalog-tree.service';
import {CatalogDto} from '../../../../models/CatalogDto';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') btnRef: any;
  @ViewChild(MainHeaderComponent, { static: false })
  private counterComponent: MainHeaderComponent;
  rooItemMenu:CatalogDto[] = [];
  constructor(private catalogService: CatalogTreeService) { }

  ngOnInit(): void {
    this.catalogService.getCatalog().subscribe(value => {

      for (let i in value) {
        let catalog = new CatalogDto();
        catalog.value = value[i].value;
        catalog.children = value[i].children;
        catalog.status = value[i].status;
        catalog.type = value[i].type;
        catalog.id = value[i].id;
        this.rooItemMenu.push(catalog)
      }

      console.log( this.rooItemMenu)
    })
  }
  ngAfterViewInit() {
    this.counterComponent.menuComponent.drawer = this.btnRef;
  }

}
