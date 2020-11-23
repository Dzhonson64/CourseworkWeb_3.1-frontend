import {AddressObj} from './AddressObj';

export class AddressCompany {
  id?: number = null;
  region: AddressObj = new AddressObj();
  city: AddressObj = new AddressObj();
  district?: AddressObj = new AddressObj();
  street: AddressObj = new AddressObj();
  building: AddressObj = new AddressObj();
  country: AddressObj = new AddressObj();


  constructor(id?: number,  country: AddressObj = new AddressObj(), region: AddressObj = new AddressObj(),  city: AddressObj = new AddressObj(),
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
    this.country = country;
  }

  static getInstance(obj: AddressCompany): AddressCompany {
    if (obj == null) {
      return new AddressCompany();
    }

    return new AddressCompany(
      obj.id,
      obj.region,
      obj.city,
      obj.district,
      obj.street,
      obj.building,
      obj.country
    );
  }

}


