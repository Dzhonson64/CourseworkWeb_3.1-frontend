import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PropertyProductsDto} from '../../../models/PropertyProductsDto';
import {PropertyProductComponent} from '../componets/productCompany/components/property/property-product/property-product.component';
import {ContainerPropertiesComponent} from '../componets/productCompany/components/property/container-properties/container-properties.component';
import {StatusActive} from '../../../models/type/StatusActive';

@Injectable({
  providedIn: 'root'
})
export class TablePropertyProductService {
  propertiesMap = new Map<number, PropertyProductComponent[]>();
  savedPropertyProductsDto:PropertyProductsDto[] = []
  containerPropertyMap = new Map<number, ContainerPropertiesComponent>();

  constructor(private http: HttpClient) {
  }

  savePropertyProduct():Observable<PropertyProductsDto[]> {
    this.reformatDate();
    console.log(this.savedPropertyProductsDto)
    return this.http.post<PropertyProductsDto[]>('/api/courseworkWeb/products/properties', this.savedPropertyProductsDto);

  }

  getPropertyProduct():Observable<PropertyProductsDto[]> {
    return this.http.get<PropertyProductsDto[]>('/api/courseworkWeb/products/properties');

  }

  getPropertyProductByCatalog(id:number):Observable<PropertyProductsDto[]> {
    return this.http.get<PropertyProductsDto[]>(`/api/courseworkWeb/products/properties/catalog/${id}`);

  }

  deleteProperty(id:number):Observable<PropertyProductsDto> {
    return this.http.delete<PropertyProductsDto>(`/api/courseworkWeb/products/properties/${id}`);
  }

  private reformatDate() {
    this.savedPropertyProductsDto = [];
    for (let entry of this.propertiesMap.entries()){
      for (let property of entry[1]){
        if (property.status == StatusActive.ENABLE) {
          let savedPropertyProductsDto = new PropertyProductsDto();
          savedPropertyProductsDto.catalogId = entry[0];
          savedPropertyProductsDto.name = property.name_property;
          savedPropertyProductsDto.unit = property.unit_property;
          savedPropertyProductsDto.id = property.id;
          this.savedPropertyProductsDto.push(savedPropertyProductsDto);
        }

      }

    }
  }
}
