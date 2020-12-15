import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PropertyProductsDto} from '../../../models/PropertyProductsDto';
import {ProductDto} from '../../../models/ProductDto';
import {ProductPropertyDto} from '../../../models/ProductPropertyDto';
import {FillPropertyDto} from '../../../models/FillPropertyDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  saveProduct(product: ProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>('/api/courseworkWeb/products', product);

  }

  savePropertyProduct(propertyProduct: ProductPropertyDto[]): Observable<ProductPropertyDto[]> {
    return this.http.post<ProductPropertyDto[]>('/api/courseworkWeb/products/product-property', propertyProduct);

  }

  getProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>('/api/courseworkWeb/products');
  }

  deleteProducts(product: ProductDto): Observable<ProductDto> {
    return this.http.delete<ProductDto>(`/api/courseworkWeb/products/${product.id}`);
  }

  getAllPropertyByProduct(id: number): Observable<FillPropertyDto> {
    return this.http.get<FillPropertyDto>(`/api/courseworkWeb/products/${id}/properties`);
  }

  getProductById(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`/api/courseworkWeb/products/${id}`);
  }
}
