import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PropertyProductsDto} from '../../../models/PropertyProductsDto';
import {ProductDto} from '../../../models/ProductDto';
import {ProductPropertyDto} from '../../../models/ProductPropertyDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  saveProduct(product: ProductDto):Observable<ProductDto> {
    return this.http.post<ProductDto>('/api/courseworkWeb/products', product);

  }

  savePropertyProduct(propertyProduct: ProductPropertyDto[]):Observable<ProductPropertyDto[]> {
    return this.http.post<ProductPropertyDto[]>('/api/courseworkWeb/products/product-property', propertyProduct);

  }

  getProducts():Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>('/api/courseworkWeb/products');

  }
}
