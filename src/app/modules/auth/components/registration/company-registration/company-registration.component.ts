import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, MaxLengthValidator, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {AddressObj} from '../../../../../models/address/addressObj';
import {Address} from '../../../../../models/address/Address';
import {Observable} from 'rxjs';
import {FindAddressService} from '../../../../common-service/find-address.service';

declare var $: any;
@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyRegistrationComponent implements OnInit {


  regCompanyForm: FormGroup;
  nameCompany: FormControl;
  countryCompany: FormControl;
  cityCompany: FormControl;
  streetCompany: FormControl;
  buildingCompany: FormControl;
  regionCompany: FormControl;
  districtCompany: FormControl;


  private _resAddress: Address;

  filteredOptions: Observable<AddressObj[]>;
  public fiasObjects: Array<AddressObj> = new Array<AddressObj>();

  constructor(private authService: AuthService, private findAddressService: FindAddressService) {
    this.resAddress = new Address();
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.Jquery();

    this.findAddressService.searchRegion(this.regionCompany, this.fiasObjects)



  }

  createFormControls() {
    this.nameCompany = new FormControl('', Validators.required);
    this.cityCompany = new FormControl('', Validators.required);
    this.countryCompany = new FormControl('', Validators.required);
    this.streetCompany = new FormControl('', Validators.required);
    this.buildingCompany = new FormControl('', Validators.required);
    this.regionCompany = new FormControl('', Validators.required);
    this.districtCompany = new FormControl('');

  }

  createForm() {
    this.regCompanyForm = new FormGroup({
      nameCompany: this.nameCompany,
      countryCompany: this.countryCompany,
      cityCompany: this.cityCompany,
      streetCompany: this.streetCompany,
      buildingCompany: this.buildingCompany,
      regionCompany: this.regionCompany,
      districtCompany: this.districtCompany
    });

  }


  displayFn(obj: AddressObj): string {
    return obj && obj.name ? obj.name : '';
  }

  private Jquery() {
    $.fias.token = '5Kaya85thDHibsYt2frbZzNQ6kh2StNN';
    $.fias.url = 'https://kladr-api.ru/api.php';
  }

  selectRegion(addressObj: AddressObj) {
    this.resAddress.region = addressObj;
    this.findAddressService.searchDistrict(this.districtCompany, this.resAddress.region, this.fiasObjects);
    this.findAddressService.searchCity(this.cityCompany, this.resAddress.region, this.fiasObjects);
    console.log(this.resAddress);
    this.clearOldData();
  }

  public selectStreet(addressObj: AddressObj) {
    this.resAddress.street = addressObj;
    this.findAddressService.searchBuilding(this.buildingCompany, this.resAddress.street, this.fiasObjects);
    console.log(this.resAddress);

  }


  public selectLocality(addressObj: AddressObj) {
    this.resAddress.city = addressObj;
    this.findAddressService.searchStreet(this.streetCompany, this.resAddress.city, this.fiasObjects);
    console.log(this.resAddress)
    this.clearOldData();
  }

  public selectBuilding(addressObj: AddressObj) {
    this.resAddress.building = addressObj;

    console.log(this.resAddress)
  }

  public selectDistrict(addressObj: AddressObj) {
    this.resAddress.district = addressObj;

    console.log(this.resAddress)
  }




  get resAddress(): Address {
    return this._resAddress;
  }

  set resAddress(value: Address) {
    this._resAddress = value;
  }





  submit() {
    this.checkForm();
    this.authService.saveAddress(this.resAddress).subscribe(value => {
      console.log(value);
    });

  }

  private checkForm() {
    console.log(this.resAddress);
    if (this.resAddress.region.name == "") {
      let obj = new AddressObj();
      obj.name = this.regionCompany.value;
      this.resAddress.region = obj;
    }
    if (this.resAddress.district.name == "") {
      let obj = new AddressObj();
      obj.name = this.districtCompany.value;
      this.resAddress.district = obj;
    }
    if (this.resAddress.city.name == "") {
      let obj = new AddressObj();
      obj.name = this.cityCompany.value;
      this.resAddress.city = obj;
    }
    if (this.resAddress.street.name == "") {
      let obj = new AddressObj();
      obj.name = this.streetCompany.value;
      this.resAddress.street = obj;
    }
    if (this.resAddress.building.name == "") {
      let obj = new AddressObj();
      obj.name = this.buildingCompany.value;
      this.resAddress.building = obj;
    }
    console.log(this.resAddress);
  }

  clearOldData() {
    this.fiasObjects.forEach(value => {
      this.fiasObjects.shift()
    });
  }

  deleteFiasArr() {
    this.regionCompany.setValue("");
    this.districtCompany.setValue("");
    this.cityCompany.setValue("");
    this.streetCompany.setValue("");
    this.buildingCompany.setValue("");
    this.resAddress = new Address();
  }
}
