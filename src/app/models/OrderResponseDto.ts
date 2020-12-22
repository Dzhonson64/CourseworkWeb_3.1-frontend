import {OrderProductDto} from './OrderProductDto';
export class OrderResponseDto {
  id:number;
  orderProductList: OrderProductDto[];
  amount:number;
  date: string;
}
