import {ComponentRef} from '@angular/core';
import {TreeCatalogComponent} from '../modules/profile/componets/productCompany/components/tree-catalog/tree-catalog.component';
import {TreeItemComponent} from '../modules/profile/componets/productCompany/components/tree-catalog/tree-item/tree-item.component';


export class CatalogTreeItem {
  numId: number;
  children: TreeItemComponent[];
  value: ComponentRef<TreeItemComponent>;
  parent: TreeItemComponent;
}
