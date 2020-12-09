import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CatalogTreeItem} from '../../../../../../../models/CatalogTreeItem';
import {TreeItemComponent} from '../../tree-catalog/sub-tree-item/tree-item.component';
import {NodeCatalogTreeType} from '../../../../../../../models/type/NodeCatalogTreeType';
import {PropertyProduct} from '../../../../../../../models/PropertyProduct';
import {PropertyProductComponent} from '../property-product/property-product.component';
import {TablePropertyProductService} from '../../../../../services/table-property-product.service';

@Component({
  selector: 'app-container-properties',
  templateUrl: './container-properties.component.html',
  styleUrls: ['./container-properties.component.scss']
})
export class ContainerPropertiesComponent implements OnInit, AfterViewInit {
  @Input() catalogId: number;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  propertyComponentList: PropertyProductComponent[] = [];
  constructor(private resolver: ComponentFactoryResolver, private propertyProductService: TablePropertyProductService) {

  }

  ngOnInit(): void {
    this.propertyProductService.containerPropertyMap.set(this.catalogId, this);
  }



  createComponentProperty() {
    const factory: ComponentFactory<PropertyProductComponent> = this.resolver.resolveComponentFactory(PropertyProductComponent);
    let propertyProductComponent = this.container.createComponent(factory);
    this.propertyComponentList.push(propertyProductComponent.instance);
    if (this.propertyProductService.propertiesMap.get(this.catalogId) == undefined) {
      this.propertyProductService.propertiesMap.set(this.catalogId, new Array<PropertyProductComponent>());
    }

    this.propertyProductService.propertiesMap.get(this.catalogId).push(propertyProductComponent.instance);
  }

  createComponentPropertyFromDB(name: string, unit: string, id:number):PropertyProductComponent {
    const factory: ComponentFactory<PropertyProductComponent> = this.resolver.resolveComponentFactory(PropertyProductComponent);
    let propertyProductComponent = this.container.createComponent(factory);
    if (this.propertyProductService.propertiesMap.get(this.catalogId) == undefined) {
      this.propertyProductService.propertiesMap.set(this.catalogId, new Array<PropertyProductComponent>());
    }
    propertyProductComponent.instance.name_property = name;
    propertyProductComponent.instance.unit_property = unit;
    propertyProductComponent.instance.id = id;
    this.propertyProductService.propertiesMap.get(this.catalogId).push(propertyProductComponent.instance);
    return propertyProductComponent.instance
  }

  ngAfterViewInit(): void {
    console.log(this.catalogId)
  }

}
