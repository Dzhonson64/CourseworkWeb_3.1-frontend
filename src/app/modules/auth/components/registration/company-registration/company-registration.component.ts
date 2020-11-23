import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {AddressObj} from '../../../../../models/address/AddressObj';
import {AddressCompany} from '../../../../../models/address/AddressCompany';
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


  private _resAddress: AddressCompany;

  filteredOptions: Observable<AddressObj[]>;
  public fiasObjects: Array<AddressObj> = new Array<AddressObj>();

  constructor(private authService: AuthService, private findAddressService: FindAddressService) {
    this.resAddress = new AddressCompany();
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.Jquery();

    this.findAddressService.searchRegion(this.regionCompany, this.fiasObjects);
this.findAddressService.requestCompanyBYINN("402708415215").subscribe(value => console.log(value))

  }

  createFormControls() {
    this.nameCompany = new FormControl('', [Validators.required, Validators.maxLength(30)]);
    this.cityCompany = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.countryCompany = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.streetCompany = new FormControl('', [Validators.required, Validators.maxLength(15)]);
    this.buildingCompany = new FormControl('', [Validators.required, Validators.maxLength(10)]);
    this.regionCompany = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.districtCompany = new FormControl('', [Validators.maxLength(15)]);

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
    console.log(this.resAddress);
    this.clearOldData();
  }

  public selectBuilding(addressObj: AddressObj) {
    this.resAddress.building = addressObj;

    console.log(this.resAddress);
  }

  public selectDistrict(addressObj: AddressObj) {
    this.resAddress.district = addressObj;

    console.log(this.resAddress);
  }


  get resAddress(): AddressCompany {
    return this._resAddress;
  }

  set resAddress(value: AddressCompany) {
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
    if (this.resAddress.region.name == '') {
      let obj = new AddressObj();
      obj.name = this.regionCompany.value;
      this.resAddress.region = obj;
    }
    if (this.resAddress.district.name == '') {
      let obj = new AddressObj();
      obj.name = this.districtCompany.value;
      this.resAddress.district = obj;
    }
    if (this.resAddress.city.name == '') {
      let obj = new AddressObj();
      obj.name = this.cityCompany.value;
      this.resAddress.city = obj;
    }
    if (this.resAddress.street.name == '') {
      let obj = new AddressObj();
      obj.name = this.streetCompany.value;
      this.resAddress.street = obj;
    }
    if (this.resAddress.building.name == '') {
      let obj = new AddressObj();
      obj.name = this.buildingCompany.value;
      this.resAddress.building = obj;
    }
    console.log(this.resAddress);
  }

  clearOldData() {
    this.fiasObjects.forEach(value => {
      this.fiasObjects.shift();
    });
  }

  selectCountry() {
    for (let i in this.regCompanyForm.controls) {
      this.regCompanyForm.controls[i].setValue('');
      console.log(this.regCompanyForm.controls[i]);
    }
    this.resAddress = new AddressCompany();
    this.regCompanyForm.markAsDirty();
  }

  public getErrorMessageRequired(nameFiled: string): string {
    return 'Заполните поле ' + nameFiled;
  }

  public getErrorMessageEmail(): string {
    return 'Не правильный email.';
  }


  public getErrorMessageMaxLength(nameFiled: string, amount: number): string {
    return 'Символов в поле ' + nameFiled + ' должно быть не более ' + amount + ' символов.';
  }

  public getErrorMessageMax(nameFiled: string, amount: number): string {
    return 'Число в поле ' + nameFiled + ' должно быть не более ' + amount;
  }

  public getErrorMessageMin(nameFiled: string, amount: number): string {
    return 'Число в поле ' + nameFiled + ' должно быть не менее ' + amount;
    ;
  }


}