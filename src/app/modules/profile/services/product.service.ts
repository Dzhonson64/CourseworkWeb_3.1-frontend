import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductDto} from '../../../models/ProductDto';
import {ProductPropertyDto} from '../../../models/ProductPropertyDto';
import {FillPropertyDto} from '../../../models/FillPropertyDto';
import {OrderDto} from '../../../models/OrderDto';
import {OrderResponseDto} from '../../../models/OrderResponseDto';
import {BuyDto} from '../../../models/BuyDto';

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

  order() {
    let userId = localStorage.getItem('userId');
    return this.http.post(`/api/courseworkWeb/order/user/${userId}`, null);

  }

  buyOrder(idOrder: number, totalPrice: number) {
    let userId = localStorage.getItem('userId');
    let buyOrder = new BuyDto();
    buyOrder.totalPrice =  Number(totalPrice);
    buyOrder.userId = Number(userId);
    console.log(buyOrder);
    return this.http.post(`/api/courseworkWeb/order/${idOrder}/buy`, buyOrder);
  }

  deleteFromOrder(orderId:number, productId:number) {
    return this.http.delete(`/api/courseworkWeb/order/product`, {
      params: new HttpParams().set('orderId', String(orderId)).set("productId", String(productId))
    } );
  }

  getOrders(): Observable<OrderResponseDto> {
    let userId = localStorage.getItem('userId');
    return this.http.get<OrderResponseDto>(`/api/courseworkWeb/order/user/${userId}`);

  }

  getProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>('/api/courseworkWeb/products');
  }

  deleteProducts(product: ProductDto): Observable<ProductDto> {
    return this.http.delete<ProductDto>(`/api/courseworkWeb/products/${product.id}`);
  }

  getAllPropertyByProduct(id: number): Observable<FillPropertyDto[]> {
    return this.http.get<FillPropertyDto[]>(`/api/courseworkWeb/products/${id}/properties`);
  }

  getProductById(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`/api/courseworkWeb/products/${id}`);
  }

  getAllProductByCatalogId(id: number): Observable<ProductDto[]> {
    console.log(id);
    return this.http.get<ProductDto[]>(`/api/courseworkWeb/products/catalog/${id}`);
  }


  findAllByProvider(id: number): Observable<OrderResponseDto[]> {
    return this.http.get<OrderResponseDto[]>(`/api/courseworkWeb/order/sales/${id}`);
  }

  getLastProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`/api/courseworkWeb/products/last-products`);
  }
}
