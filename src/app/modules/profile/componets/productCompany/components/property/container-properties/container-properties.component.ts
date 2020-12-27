import {
  AfterViewInit, ChangeDetectorRef,
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
  changeDetectorRef: ChangeDetectorRef;
  propertyComponentList: PropertyProductComponent[] = [];
  a = 0;

  constructor(private resolver: ComponentFactoryResolver,
              private propertyProductService: TablePropertyProductService,
              private cdRef: ChangeDetectorRef) {
    this.changeDetectorRef = cdRef;
  }

  ngOnInit(): void {
    this.propertyProductService.containerPropertyMap.set(this.catalogId, this);
    this.propertyProductService.getPropertyProduct().subscribe(value => {
      this.propertyProductService.amountProperty += 1;
      if (this.propertyProductService.amountProperty <= 1) {
        for (let i of value) {
          if (i.catalogId != null) {
            let containerProperties = this.propertyProductService.containerPropertyMap.get(i.catalogId);
            let property = new PropertyProductComponent(this.propertyProductService);
            property.unit_property = i.unit;
            property.name_property = i.name;
            property.id = i.id;
            containerProperties.changeDetectorRef.detectChanges();
            containerProperties.propertyComponentList.push(property);
          }


        }
        this.propertyProductService.propertiesMap = new Map<number, PropertyProductComponent[]>();
        for (let container of this.propertyProductService.containerPropertyMap.values()) {
          for (let property of container.propertyComponentList) {
            container.createComponentPropertyFromDB(property.name_property, property.unit_property, property.id);
          }

        }
      }

    });
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

  createComponentPropertyFromDB(name: string, unit: string, id: number): PropertyProductComponent {
    const factory: ComponentFactory<PropertyProductComponent> = this.resolver.resolveComponentFactory(PropertyProductComponent);
    let propertyProductComponent = this.container.createComponent(factory);
    if (this.propertyProductService.propertiesMap.get(this.catalogId) == undefined) {
      this.propertyProductService.propertiesMap.set(this.catalogId, new Array<PropertyProductComponent>());
    }
    propertyProductComponent.instance.name_property = name;
    propertyProductComponent.instance.unit_property = unit;
    propertyProductComponent.instance.id = id;
    this.propertyProductService.propertiesMap.get(this.catalogId).push(propertyProductComponent.instance);
    return propertyProductComponent.instance;
  }

  ngAfterViewInit(): void {
  }

}
