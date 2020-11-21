import {AddressObj} from './addressObj';

export class Address {
  id?: number = null;
  region: AddressObj = new AddressObj();
  city: AddressObj = new AddressObj();
  district?: AddressObj = new AddressObj();
  street: AddressObj = new AddressObj();
  building: AddressObj = new AddressObj();


  constructor(id?: number, region: AddressObj = new AddressObj(),  city: AddressObj = new AddressObj(),
              district?: AddressObj, street: AddressObj = new AddressObj(),  building: AddressObj = new AddressObj()) {
    if (id == undefined) {
      this.id = null;
    } else {
      this.id = id;
    }

    if (district == undefined) {
      this.district = new AddressObj();
    } else {
      this.district = district;
    }


    this.region = region;
    this.city = city;
    this.street = street;
    this.building = building;
  }

  static getInstance(obj: Address): Address {
    if (obj == null) {
      return new Address();
    }

    return new Address(
      obj.id,
      obj.region,
      obj.city,
      obj.district,
      obj.street,
      obj.building
    );
  }

}


