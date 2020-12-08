import {Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CatalogTreeItem} from '../../../../../../models/CatalogTreeItem';
import {TreeItemComponent} from '../tree-catalog/sub-tree-item/tree-item.component';
import {NodeCatalogTreeType} from '../../../../../../models/type/NodeCatalogTreeType';
import {PropertyProduct} from '../../../../../../models/PropertyProduct';
import {PropertyProductComponent} from '../property-product/property-product.component';

@Component({
  selector: 'app-container-properties',
  templateUrl: './container-properties.component.html',
  styleUrls: ['./container-properties.component.scss']
})
export class ContainerPropertiesComponent implements OnInit {

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  propertyComponentList: PropertyProductComponent[] = [];
  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  createComponentProperty() {
    const factory: ComponentFactory<PropertyProductComponent> = this.resolver.resolveComponentFactory(PropertyProductComponent);
    let propertyProductComponent = this.container.createComponent(factory);
    this.propertyComponentList.push(propertyProductComponent.instance);
  }

}
