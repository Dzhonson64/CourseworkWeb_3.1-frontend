import {ComponentRef, Injectable} from '@angular/core';
import {TreeCatalogComponent} from '../componets/productCompany/components/tree-catalog/tree-catalog.component';
import {CatalogTreeItem} from '../../../models/CatalogTreeItem';

@Injectable({
  providedIn: 'root'
})
export class CatalogTreeService {

  private _selectedItem: ComponentRef<TreeCatalogComponent>;
  private _container: any;
  private _counter = 0;
  private _catalogItemsList:CatalogTreeItem[][] = [];
  private _marginLeft = 0;


  constructor() {
  }


  get catalogItemsList(): CatalogTreeItem[][] {
    return this._catalogItemsList;
  }

  set catalogItemsList(value: CatalogTreeItem[][]) {
    this._catalogItemsList = value;
  }

  get marginLeft(): number {
    return this._marginLeft;
  }

  set marginLeft(value: number) {
    this._marginLeft = value;
  }

  get counter(): number {
    return this._counter;
  }

  set counter(value: number) {
    this._counter = value;
  }

  get container(): any {
    return this._container;
  }

  set container(value: any) {
    this._container = value;
  }

  get selectedItem(): ComponentRef<TreeCatalogComponent> {
    return this._selectedItem;
  }

  set selectedItem(value: ComponentRef<TreeCatalogComponent>) {
    this._selectedItem = value;
  }
}
