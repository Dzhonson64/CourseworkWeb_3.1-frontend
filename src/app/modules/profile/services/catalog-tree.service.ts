import {ComponentRef, Injectable} from '@angular/core';
import {CatalogTreeItem} from '../../../models/CatalogTreeItem';
import {TreeItemComponent} from '../componets/productCompany/components/tree-catalog/sub-tree-item/tree-item.component';
import {CatalogDto} from '../../../models/CatalogDto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogTreeService {

  private _selectedItem: ComponentRef<TreeItemComponent>;
  private _container: any;
  private _counter = 0;
  private _catalogItemsList: CatalogTreeItem[][] = [];
  private _marginLeft = 0;


  constructor(private http: HttpClient) {
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


  get selectedItem(): ComponentRef<TreeItemComponent> {
    return this._selectedItem;
  }

  set selectedItem(value: ComponentRef<TreeItemComponent>) {
    this._selectedItem = value;
  }

  save():Observable<any> {
    let dto = new CatalogDto();
    for (let i in this.catalogItemsList[0]) {
      let node = this.catalogItemsList[0][i].value.instance;
      this.buildData(dto, node);
    }
    return this.saveCatalog(dto);
  }



  buildData(parent:CatalogDto, node: TreeItemComponent): CatalogDto {
    let dtoP = new CatalogDto();
    dtoP.value = node.title;
    dtoP.type = node.typeNode;
    dtoP.status = node.status;
    dtoP.id = node.id;
    parent.children.push(dtoP);

    for (let i = 0; i <  node.componentsRefArray.length; i++){
      this.buildData(dtoP, node.componentsRefArray[i].value.instance);
    }
    return dtoP;
  }

  public saveCatalog(dto: CatalogDto) {
    return this.http.post('/api/courseworkWeb/products/catalog', dto.children);
  }

  public getCatalog():Observable<CatalogDto[]> {
    return this.http.get<CatalogDto[]>('/api/courseworkWeb/products/catalog');
  }

  public getCatalogLast():Observable<CatalogDto[]> {
    return this.http.get<CatalogDto[]>('/api/courseworkWeb/products/catalog/last');
  }

  public getCatalogByProductId(id):Observable<CatalogDto> {
    return this.http.get<CatalogDto>(`/api/courseworkWeb/products/${id}/catalog`);
  }
}
