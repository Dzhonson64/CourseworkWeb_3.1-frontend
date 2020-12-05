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
import {TreeItemComponent} from './tree-item/tree-item.component';
import {StatusActive} from '../../../../../../models/type/StatusActive';
import {CatalogDto} from '../../../../../../models/CatalogDto';
import {StatusMode} from '../../../../../../models/type/StatusMode';

@Component({
  selector: 'app-tree-catalog',
  templateUrl: './tree-catalog.component.html',
  styleUrls: ['./tree-catalog.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class TreeCatalogComponent implements OnInit, AfterViewInit {
  @ViewChild('parent', {read: ViewContainerRef}) container: ViewContainerRef;
  @ViewChild('catalog', {read: ViewContainerRef}) catalogItem: ComponentRef<TreeCatalogComponent>;
  @ViewChild(TreeItemComponent) child: TreeItemComponent;

  thisNode: ComponentRef<TreeItemComponent>;
  parentNode: ComponentRef<TreeItemComponent> = null;
  id: number;
  cssMarginLeft: number;
  typeNode: NodeCatalogTreeType = NodeCatalogTreeType.ROOT_NODE;
  status: StatusActive;
  componentsRefArray: CatalogTreeItem[] = [];
  globalCompCatalog: CatalogDto[];
  globalCompTreeItem: TreeItemComponent;

  constructor(private resolver: ComponentFactoryResolver, private catalogTreeService: CatalogTreeService) {
    this.parentNode = null;
    catalogTreeService.counter++;
    this.cssMarginLeft = catalogTreeService.marginLeft;
    this.catalogTreeService.catalogItemsList.push(this.componentsRefArray);
    this.catalogTreeService.container = this.container;
  }

  ngOnInit(): void {
    this.catalogTreeService.getCatalog().subscribe(value => {
      let catalogTree = new CatalogDto();
      catalogTree.children = value;
      this.buildDataFromDB(catalogTree);

    });
  }

  ngAfterViewInit() {

  }


  createChild() {
    let catalogItemList = new CatalogTreeItem();
    const factory: ComponentFactory<TreeItemComponent> = this.resolver.resolveComponentFactory(TreeItemComponent);
    catalogItemList.value = this.container.createComponent(factory);
    catalogItemList.value.instance.thisNode = catalogItemList.value;
    if (catalogItemList.value.instance.parentNode === undefined || catalogItemList.value.instance.parentNode === null) {
      catalogItemList.value.instance.typeNode = NodeCatalogTreeType.ROOT_NODE;
    } else {
      catalogItemList.value.instance.typeNode = NodeCatalogTreeType.SUB_NODE;
    }
    catalogItemList.value.location.nativeElement.getElementsByClassName('catalog-item')[0].style.marginLeft = this.cssMarginLeft + 'px';
    catalogItemList.value.instance.cssMarginLeft = this.cssMarginLeft + 50;
    this.componentsRefArray.push(catalogItemList);


  }

  createChildFromDB(id: number, value: string, status: NodeCatalogTreeType): TreeItemComponent {
    let catalogItemList = new CatalogTreeItem();
    const factory: ComponentFactory<TreeItemComponent> = this.resolver.resolveComponentFactory(TreeItemComponent);
    catalogItemList.value = this.container.createComponent(factory);
    catalogItemList.value.instance.thisNode = catalogItemList.value;
    catalogItemList.value.instance.id = id;
    catalogItemList.value.instance.title = value;
    catalogItemList.value.instance.typeNode = status;
    catalogItemList.value.instance.mode = StatusMode.VIEW;
    catalogItemList.value.location.nativeElement.getElementsByClassName('catalog-item')[0].style.marginLeft = this.cssMarginLeft + 'px';
    catalogItemList.value.instance.cssMarginLeft = this.cssMarginLeft + 50;
    this.componentsRefArray.push(catalogItemList);

    return catalogItemList.value.instance;

  }

  buildDataFromDB(catalogTree: CatalogDto) {

    for (let i in catalogTree.children) {
      let catalog = catalogTree.children[i];
      let child = this.createChildFromDB(catalog.id, catalog.value, catalog.status);
      this.buildDataChildItem(catalog.children, child);
    }
  }

  buildDataChildItem(catalog: CatalogDto[], treeItem: TreeItemComponent): TreeItemComponent {
    for (let i in catalog) {
      treeItem.changeDetectorRef.detectChanges();
      let treeItems = treeItem.createSubCatalogFromDB(catalog[i].id, catalog[i].value, catalog[i].status);
      this.buildDataChildItem(catalog[i].children, treeItems);

    }
    return treeItem;
  }


  save() {
    this.catalogTreeService.save();
  }
}
