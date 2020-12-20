import {AddressUser} from './address/AddressUser';
import {AddressCompany} from './address/AddressCompany';

export class ProviderDto {
  id: number;
  name: string;
  password: string;
  address: AddressCompany;
}
