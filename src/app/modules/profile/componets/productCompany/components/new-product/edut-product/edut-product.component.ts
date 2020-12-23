import {Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CatalogTreeService} from '../../../../../services/catalog-tree.service';
import {TablePropertyProductService} from '../../../../../services/table-property-product.service';
import {ProductService} from '../../../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CompNewProductComponent} from '../comp-new-product/comp-new-product.component';
import {ProductDto} from '../../../../../../../models/ProductDto';
import {ProductPropertyDto} from '../../../../../../../models/ProductPropertyDto';
import {CatalogDto} from '../../../../../../../models/CatalogDto';

@Component({
  selector: 'app-edut-product',
  templateUrl: './edut-product.component.html',
  styleUrls: ['./edut-product.component.scss']
})
export class EdutProductComponent implements OnInit {
  newProductFormGroup: FormGroup;
  nameProduct: FormControl;
  nameRootCatalog: FormControl;
  priceProduct: FormControl;
  descriptionProduct: FormControl;
  selectedValue: string;
  catalogs = [];
  properties:any = [];
  propertyList:any = [];
  selectedProductId: number;
  selectedCatalog: CatalogDto;
  id: number;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver,
              private catalogService: CatalogTreeService,
              private propertiesService: TablePropertyProductService,
              private productService: ProductService,
              private router: Router,
              private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {


    this._route.params.subscribe((params)=>{

      this.selectedProductId = params["product"]
      this.catalogService.getCatalogByProductId(this.selectedProductId).subscribe(value => {
        console.log(value)
        this.selectedCatalog = new CatalogDto();
        this.selectedCatalog.id  = value.id;
        this.selectedCatalog.type  = value.type;
        this.selectedCatalog.status  = value.status;
        this.selectedCatalog.value = value.value;
        this.selectedCatalog.children = value.children;
        //this.getPropertyProductByCatalog(this.selectedCatalog.id);
        this.createFormControls();
        this.createForm();
        this.productService.getProductById( this.selectedProductId).subscribe(value1 => {
          this.nameProduct.setValue(value1.name)
          this.priceProduct.setValue(value1.price)
          this.descriptionProduct.setValue(value1.description)
        })
        this.productService.getAllPropertyByProduct(this.selectedProductId).subscribe(value => {
          for (let i in value) {
            this.createProperties(value[i].name, value[i].unit, value[i].propertyId,  value[i].value, value[i].productPropertyId);
          }
          }
        );
      })
    })

  }

  private createFormControls() {
    this.nameProduct = new FormControl('', [Validators.required]);
    this.nameRootCatalog = new FormControl(this.selectedCatalog.value);
    this.priceProduct = new FormControl('', [Validators.required]);
    this.descriptionProduct = new FormControl('', [Validators.required]);
  }

  private createProperties(name: string, unit: string, id:number, value?: number, productPropertyId? : number) {

    const factory: ComponentFactory<CompNewProductComponent> = this.resolver.resolveComponentFactory(CompNewProductComponent);
    let comp = this.container.createComponent(factory);
    comp.instance.name = name;
    comp.instance.unit = unit;
    comp.instance.id = id;
    comp.instance.value = value;
    comp.instance.productPropertyId = productPropertyId;
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
    product.catalogId = this.selectedCatalog.id;
    product.id = this.selectedProductId;
    this.productService.saveProduct(product).subscribe(value => {
      let productPropertyList = [];
      for (let property of this.propertyList) {
        let productProperty = new ProductPropertyDto();
        productProperty.productId = value.id;
        productProperty.propertyId = property.id;
        productProperty.value = property.value;
        productProperty.productPropertyId = property.productPropertyId;
        productPropertyList.push(productProperty);
      }


      this.productService.savePropertyProduct(productPropertyList).subscribe(value1 => {
        this.router.navigate(['/products']);
      })
      //console.log(value);
    })
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
