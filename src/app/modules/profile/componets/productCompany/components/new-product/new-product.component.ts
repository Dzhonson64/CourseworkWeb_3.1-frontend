import {Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {now} from 'moment/moment';
import {GenderType} from '../../../../../../models/type/GenderType';
import {TablePropertyProductService} from '../../../../services/table-property-product.service';
import {CatalogTreeService} from '../../../../services/catalog-tree.service';
import {CatalogTreeItem} from '../../../../../../models/CatalogTreeItem';
import {TreeItemComponent} from '../tree-catalog/sub-tree-item/tree-item.component';
import {CompNewProductComponent} from './comp-new-product/comp-new-product.component';
import {ProductDto} from '../../../../../../models/ProductDto';
import {ProductService} from '../../../../services/product.service';
import {ProductPropertyDto} from '../../../../../../models/ProductPropertyDto';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  newProductFormGroup: FormGroup;
  nameProduct: FormControl;
  nameRootCatalog: FormControl;
  priceProduct: FormControl;
  descriptionProduct: FormControl;
  selectedValue: string;
  catalogs = [];
  properties = [];
  propertyList = [];
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver,
              private catalogService: CatalogTreeService,
              private propertiesService: TablePropertyProductService,
              private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.catalogService.getCatalogLast().subscribe(value => {
        console.log(value);
        this.catalogs = value;
      }
    );
  }

  private createFormControls() {
    this.nameProduct = new FormControl('', [Validators.required]);
    this.nameRootCatalog = new FormControl('', [Validators.required]);
    this.priceProduct = new FormControl('', [Validators.required]);
    this.descriptionProduct = new FormControl('', [Validators.required]);
  }

  private createProperties(name: string, unit: string, id:number) {

    const factory: ComponentFactory<CompNewProductComponent> = this.resolver.resolveComponentFactory(CompNewProductComponent);
    let comp = this.container.createComponent(factory);
    comp.instance.name = name;
    comp.instance.unit = unit;
    comp.instance.id = id;
    this.propertyList.push(comp.instance);
  }

  private createForm() {
    this.newProductFormGroup = new FormGroup({
      nameProduct: this.nameProduct,
      nameRootCatalog: this.nameRootCatalog,
      priceProduct: this.priceProduct,
      descriptionProduct: this.descriptionProduct
    });
  }

  submit() {
this.saveProduct();
  }

  getPropertyProductByCatalog(id: number) {
    this.propertiesService.getPropertyProductByCatalog(id).subscribe(value => {
      console.log(value);
      this.properties = value;
      this.propertyList = [];
      this.container.clear();
      for (let i in value) {
        this.createProperties(value[i].name, value[i].unit, value[i].id);
      }
      console.log(this.propertyList);
    });
  }

  saveProduct() {
    let product = new ProductDto();
    product.name = this.nameProduct.value;
    product.price = this.priceProduct.value;
    product.description = this.descriptionProduct.value;
    this.productService.saveProduct(product).subscribe(value => {
      let productPropertyList = [];
      for (let property of this.propertyList) {
        let productProperty = new ProductPropertyDto();
        productProperty.productId = value.id;
        productProperty.propertyId = property.id;
        productProperty.value = property.value;
        productPropertyList.push(productProperty);
      }


      this.productService.savePropertyProduct(productPropertyList).subscribe(value1 => {

      })
      console.log(value);
    })
  }


}
