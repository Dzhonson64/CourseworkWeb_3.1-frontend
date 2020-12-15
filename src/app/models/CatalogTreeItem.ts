import {ComponentRef} from '@angular/core';
import {TreeCatalogComponent} from '../modules/profile/componets/productCompany/components/tree-catalog/root-tree-item/tree-catalog.component';
import {TreeItemComponent} from '../modules/profile/componets/productCompany/components/tree-catalog/sub-tree-item/tree-item.component';


export class CatalogTreeItem {
  numId: number;
  children: TreeItemComponent[];
  value: ComponentRef<TreeItemComponent>;
  parent: TreeItemComponent;
}
