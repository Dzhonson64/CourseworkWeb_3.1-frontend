import {ComponentRef} from '@angular/core';
import {TreeCatalogComponent} from '../modules/profile/componets/productCompany/components/tree-catalog/tree-catalog.component';


export class CatalogTreeItem {
  numId: string;
  children: ComponentRef<TreeCatalogComponent>[];
  value: ComponentRef<TreeCatalogComponent>;
}
