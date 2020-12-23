import {ProductDto} from './ProductDto';

export class OrderProductDto {
  id: number;
  product: ProductDto;
  amount: number;
  date: string;
  orderId: number;
}
