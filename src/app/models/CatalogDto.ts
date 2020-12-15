import {NodeCatalogTreeType} from './type/NodeCatalogTreeType';
import {StatusActive} from './type/StatusActive';

export class CatalogDto {
  id: number;
  children: CatalogDto[] = [];
  value: string;
  type: NodeCatalogTreeType;
  status: StatusActive;
  show: boolean = false;


}
