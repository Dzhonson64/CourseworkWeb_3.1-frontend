import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NodeCatalogTreeType} from '../../../../../../../models/type/NodeCatalogTreeType';
import {CatalogTreeItem} from '../../../../../../../models/CatalogTreeItem';
import {CatalogTreeService} from '../../../../../services/catalog-tree.service';
import {TreeCatalogComponent} from '../tree-catalog.component';
import {StatusActive} from '../../../../../../../models/type/StatusActive';
import {StatusMode} from '../../../../../../../models/type/StatusMode';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent implements OnInit {
  title: string = "";
  modeStatus = StatusMode
  catalogType = NodeCatalogTreeType
  @ViewChild('parent', {read: ViewContainerRef}) container: ViewContainerRef;
  @ViewChild('catalog', {read: ViewContainerRef}) catalogItem: ComponentRef<TreeItemComponent>;
  thisNode: ComponentRef<TreeItemComponent | TreeCatalogComponent>;
  parentNode: ComponentRef<TreeItemComponent | TreeCatalogComponent>;
  status: StatusActive;
  id: number;
  cssMarginLeft: number;
  typeNode: NodeCatalogTreeType = NodeCatalogTreeType.ROOT_NODE;
  mode: StatusMode;
  componentsRefArray: CatalogTreeItem[] = [];

  constructor(private resolver: ComponentFactoryResolver, private catalogTreeService: CatalogTreeService) {
    this.mode = StatusMode.EDIT;
    this.parentNode = null;
    catalogTreeService.counter++;
    this.cssMarginLeft = catalogTreeService.marginLeft;
    this.status = StatusActive.ENABLE;
    //console.log(catalogTreeService.catalogItemsList)
  }

  ngOnInit(): void {

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
    const factory: ComponentFactory<TreeItemComponent> = this.resolver.resolveComponentFactory(TreeItemComponent);

    catalogItemList.value = this.catalogTreeService.container.createComponent(factory);
    catalogItemList.value.instance.thisNode = catalogItemList.value;
    catalogItemList.value.instance.status = StatusActive.ENABLE;

    catalogItemList.value.instance.parentNode = this.thisNode;
    if (catalogItemList.value.instance.parentNode === undefined || catalogItemList.value.instance.parentNode === null ) {

      catalogItemList.value.instance.typeNode = NodeCatalogTreeType.ROOT_NODE;
    } else {
      catalogItemList.value.instance.typeNode = NodeCatalogTreeType.SUB_NODE;
    }

    catalogItemList.value.location.nativeElement.getElementsByClassName('catalog-item')[0].style.marginLeft = this.cssMarginLeft + 'px';
    catalogItemList.value.instance.cssMarginLeft = this.cssMarginLeft + 50;
    this.componentsRefArray.push(catalogItemList);
    if (catalogItemList.value.instance.typeNode == 0) {
      this.catalogTreeService.catalogItemsList.push(this.componentsRefArray);
    }

    this.ngOnInit();
    this.ngAfterViewInit();
  }

  deleteChildren() {
    this.container.clear();
    while (this.componentsRefArray.length > 0) this.componentsRefArray.pop()

  }

  deleteMe() {
    this.thisNode.hostView.destroy();
    this.status = StatusActive.UNABLE;

  }

  selectEditMode(str: string) {
    if (str != '') {
      this.mode = StatusMode.VIEW;
      this.title = str;
    }
  }

  edit() {
    this.mode = StatusMode.EDIT;
  }


}
