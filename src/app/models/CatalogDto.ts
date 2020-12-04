import {NodeCatalogTreeType} from './type/NodeCatalogTreeType';

export class CatalogDto {
  id: number;
  children: CatalogDto[] = [];
  value: string;
  status: NodeCatalogTreeType;
}
