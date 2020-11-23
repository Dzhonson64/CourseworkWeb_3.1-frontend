import {AddressObj} from './AddressObj';

export class AddressUser {
  id?: number = null;
  region: AddressObj = new AddressObj();
  city: AddressObj = new AddressObj();
  district?: AddressObj = new AddressObj();
  street: AddressObj = new AddressObj();
  building: AddressObj = new AddressObj();
  apartment: AddressObj = new AddressObj();
  country: AddressObj = new AddressObj();
  zipCode?: AddressObj = new AddressObj();


  constructor(id?: number, country: AddressObj = new AddressObj(),  region: AddressObj = new AddressObj(),  city: AddressObj = new AddressObj(),
              district?: AddressObj, street: AddressObj = new AddressObj(),  building: AddressObj = new AddressObj(), apartment: AddressObj = new AddressObj(),  zipCode?: AddressObj) {
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

    if (zipCode == undefined) {
      this.zipCode = new AddressObj();
    } else {
      this.zipCode = district;
    }


    this.region = region;
    this.city = city;
    this.street = street;
    this.building = building;
    this.apartment = apartment;
    this.country = country;
  }

  static getInstance(obj: AddressUser): AddressUser {
    if (obj == null) {
      return new AddressUser();
    }

    return new AddressUser(
      obj.id,
      obj.region,
      obj.city,
      obj.district,
      obj.street,
      obj.building,
      obj.region,
      obj.country,
      obj.zipCode
    );
  }

}


