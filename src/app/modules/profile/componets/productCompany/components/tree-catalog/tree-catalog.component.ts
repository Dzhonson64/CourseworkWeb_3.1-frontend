import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {CatalogTreeItem} from '../../../../../../models/CatalogTreeItem';
import {CatalogTreeService} from '../../../../services/catalog-tree.service';
import {NodeCatalogTreeType} from '../../../../../../models/type/NodeCatalogTreeType';

@Component({
  selector: 'app-tree-catalog',
  templateUrl: './tree-catalog.component.html',
  styleUrls: ['./tree-catalog.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class TreeCatalogComponent implements OnInit, AfterViewInit {
  @ViewChild('parent', {read: ViewContainerRef}) container: ViewContainerRef;
  @ViewChild('catalog', {read: ViewContainerRef}) catalogItem: ComponentRef<TreeCatalogComponent>;
  thisNode: ComponentRef<TreeCatalogComponent>;
  parentNode: ComponentRef<TreeCatalogComponent> = null;
  id: number;
  cssMarginLeft: number;
  typeNode: NodeCatalogTreeType = NodeCatalogTreeType.ROOT_NODE;

  componentsRefArray: CatalogTreeItem[] = [];

  constructor(private resolver: ComponentFactoryResolver, private catalogTreeService: CatalogTreeService) {
    this.id = catalogTreeService.counter;
    this.parentNode = null;
    catalogTreeService.counter++;
    this.cssMarginLeft = catalogTreeService.marginLeft;
    //console.log(catalogTreeService.catalogItemsList)
  }

  ngOnInit(): void {
    console.log(this.catalogTreeService.catalogItemsList);

  }

  ngAfterViewInit() {
    //console.log(this.catalogItem);
  }

  selectItemTree() {
    this.catalogTreeService.selectedItem = this.catalogItem;
    this.catalogTreeService.container = this.container;
  }

  createChild() {
    let catalogItemList = new CatalogTreeItem();
    const factory: ComponentFactory<TreeCatalogComponent> = this.resolver.resolveComponentFactory(TreeCatalogComponent);
    catalogItemList.value = this.catalogTreeService.container.createComponent(factory);
    catalogItemList.value.instance.thisNode = catalogItemList.value;
    catalogItemList.value.instance.parentNode = this.thisNode;
    if (catalogItemList.value.instance.parentNode === undefined) {
      catalogItemList.value.instance.typeNode = NodeCatalogTreeType.ROOT_NODE;
    } else {
      catalogItemList.value.instance.typeNode = NodeCatalogTreeType.SUB_NODE;
    }

    catalogItemList.value.location.nativeElement.getElementsByClassName('catalog-item')[0].style.marginLeft = this.cssMarginLeft + 'px';
    catalogItemList.value.instance.cssMarginLeft = this.cssMarginLeft + 50;
    this.componentsRefArray.push(catalogItemList);
    console.log(catalogItemList.value.instance.typeNode);
    if (catalogItemList.value.instance.typeNode == 0) {
      this.catalogTreeService.catalogItemsList.push(this.componentsRefArray);
    }

    this.ngOnInit();
    this.ngAfterViewInit();
  }

  deleteChildren() {
    this.container.clear();
  }

  deleteMe() {
    this.thisNode.hostView.destroy();
  }


}
