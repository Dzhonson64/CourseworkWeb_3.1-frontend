import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddressUser} from '../../../../../models/address/AddressUser';
import {AddressObj} from '../../../../../models/address/AddressObj';
import {Observable} from 'rxjs';
import {FindAddressService} from '../../../../common-service/find-address.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment';
import {now} from 'moment/moment';
import {GenderType} from '../../../../../models/type/GenderType';
import {User} from '../../../../../models/User';
import {AuthService} from '../../../services/auth.service';
import {UserType} from '../../../../../models/type/UserType';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    {provide: MatFormFieldControl, useExisting: RegistrationComponent},
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class RegistrationComponent implements OnInit {
  hide = true;

  regAddressUserForm: FormGroup;
  countryUser: FormControl;
  cityUser: FormControl;
  streetUser: FormControl;
  buildingUser: FormControl;
  regionUser: FormControl;
  districtUser: FormControl;
  apartmentUser: FormControl;
  zipUser: FormControl;

  regSiteDataUserForm: FormGroup;
  username: FormControl;
  passwordUser: FormControl;
  emailUser: FormControl;
  passwordConfirmUser: FormControl;
  birthdayUser: FormControl;
  genderUser: FormControl;
  phoneUser: FormControl;
  surnameUser: FormControl;
  patronymicUser: FormControl;
  nameUser: FormControl;

  isConfirmedPassword: boolean;

  private _resAddress: AddressUser = new AddressUser();
  private _userData: User = new User();
  displayPasswordError = true;

  filteredOptions: Observable<AddressObj[]>;
  public fiasObjects: Array<AddressObj> = new Array<AddressObj>();

  constructor(private _adapter: DateAdapter<any>, private findAddressService: FindAddressService, private authService: AuthService,
              private router: Router,
              private _route: ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this._adapter.setLocale('ru');
    this.createFormControls();
    this.createForm();
    this.Jquery();
    this.findAddressService.searchRegion(this.regionUser, this.fiasObjects);
    this.zipUser.valueChanges.subscribe(value => {
      console.log(this.zipUser.errors)
    });
  }

  comparePasswords(): { [key: string]: boolean } | null {

    if (this.passwordUser.value !== undefined && this.passwordConfirmUser.value !== undefined && this.passwordUser.value !== this.passwordConfirmUser.value) {
      return { 'passwordConfirmUser': true };
    }
    return null;
  }
  public getErrorMessageRequired(nameFiled: string): string {
    return 'Заполните поле ' + nameFiled;
  }

  public getErrorMessageEmail(): string {
    return 'Не правильный email.';
  }


  public getErrorMessageMaxLength(nameFiled: string, amount: number):string {
    return 'Символов в поле ' + nameFiled + ' должно быть не более ' + amount + ' символов.';
  }

  public getErrorMessageMax(nameFiled: string, amount: number):string {
    return 'Число в поле ' + nameFiled + ' должно быть не более ' + amount;
  }

  public getErrorMessageMin(nameFiled: string, amount: number):string {
    return 'Число в поле ' + nameFiled + ' должно быть не менее ' + amount;;
  }

  createFormControls() {

    this.regionUser = new FormControl('',[Validators.required, Validators.maxLength(20)]);
    this.countryUser = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.cityUser = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.districtUser = new FormControl('', [Validators.maxLength(15)]);
    this.streetUser = new FormControl('', [Validators.required, Validators.maxLength(15)]);
    this.apartmentUser = new FormControl('', [Validators.required, Validators.maxLength(5)]);
    this.buildingUser = new FormControl('', [Validators.required, Validators.maxLength(10)]);
    this.zipUser = new FormControl('', [Validators.required, Validators.max(999999), Validators.min(100000)]);


    this.username = new FormControl('', [Validators.required, Validators.maxLength(15)]);
    this.passwordUser = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.passwordConfirmUser = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.emailUser = new FormControl('', [Validators.required, Validators.email]);
    this.birthdayUser = new FormControl(moment(now()), Validators.required);
    this.genderUser = new FormControl(GenderType.MALE);
    this.phoneUser = new FormControl('', [Validators.required]);
    this.nameUser = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.surnameUser = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.patronymicUser = new FormControl('', [Validators.maxLength(20)]);
  }

  createForm() {
    this.regAddressUserForm = new FormGroup({
      regionUser: this.regionUser,
      cityUser: this.cityUser,
      districtUser: this.districtUser,
      streetUser: this.streetUser,
      apartmentUser: this.apartmentUser,
      emailUser: this.emailUser,
      countryUser: this.countryUser,
      buildingUser: this.buildingUser,
      zipUser: this.zipUser,
    });

    this.regSiteDataUserForm = new FormGroup({
      username: this.username,
      passwordUser: this.passwordUser,
      emailUser: this.emailUser,
      passwordConfirmUser: this.passwordConfirmUser,
      birthdayUser: this.birthdayUser,
      genderUser: this.genderUser,
      phoneUser: this.phoneUser,
      nameUser: this.nameUser,
      surnameUser: this.surnameUser,
      patronymicUser: this.patronymicUser,

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
    console.log(this.resAddress);
    this.findAddressService.searchDistrict(this.districtUser, this.resAddress.region, this.fiasObjects);
    this.findAddressService.searchCity(this.cityUser, this.resAddress.region, this.fiasObjects);
    console.log(this.resAddress);
    this.clearOldData();
  }

  public selectStreet(addressObj: AddressObj) {
    this.resAddress.street = addressObj;
    this.findAddressService.searchBuilding(this.buildingUser, this.resAddress.street, this.fiasObjects);
    console.log(this.resAddress);

  }


  public selectLocality(addressObj: AddressObj) {
    this.resAddress.city = addressObj;
    this.findAddressService.searchStreet(this.streetUser, this.resAddress.city, this.fiasObjects);
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


  get resAddress(): AddressUser {
    return this._resAddress;
  }

  set resAddress(value: AddressUser) {
    this._resAddress = value;
  }


  submit() {
    this.checkForm();
    this.userData.male = this.genderUser.value;
    this.userData.email = this.emailUser.value;
    this.userData.birthday = this.birthdayUser.value;
    this.userData.password = this.passwordUser.value;
    this.userData.username = this.username.value;
    this.userData.surname = this.surnameUser.value;
    this.userData.patronymic = this.patronymicUser.value;
    this.userData.name = this.nameUser.value;
    this.userData.postcode = this.zipUser.value;
    this.userData.phone = this.phoneUser.value;
    this.resAddress.type = UserType.User;
    this.userData.address = this.resAddress;
    console.log(this.userData)
    this.authService.saveUser(this.userData).subscribe(value => {
      this.router.navigate(["/login"])
    },
      error => {
        this.openSnackBar(error.error.message, "Закрыть")
      })

    // console.log(this.regAddressUserForm.controls["countryUser"]);
    /* this.checkForm();
     this.authService.saveAddress(this.resAddress).subscribe(value => {
       console.log(value);
     });*/

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  clearOldData() {
    this.fiasObjects.forEach(value => {
      this.fiasObjects.shift();
    });
  }

  deleteFiasArr() {
    this.regionUser.setValue('');
    this.districtUser.setValue('');
    this.cityUser.setValue('');
    this.streetUser.setValue('');
    this.buildingUser.setValue('');
    this.apartmentUser.setValue('');
    this.resAddress = new AddressUser();
  }

  selectApartment(addressObj: AddressObj) {
    this.resAddress.apartment = addressObj;
    console.log(this.resAddress);
  }


  get userData(): User {
    return this._userData;
  }

  set userData(value: User) {
    this._userData = value;
  }

  private checkForm() {
    console.log(this.resAddress);
    if (this.resAddress.region.name == '') {
      let obj = new AddressObj();
      obj.name = this.regionUser.value;
      this.resAddress.region = obj;
    }
    if (this.resAddress.district.name == '') {
      let obj = new AddressObj();
      obj.name = this.districtUser.value;
      this.resAddress.district = obj;
    }
    if (this.resAddress.city.name == '') {
      let obj = new AddressObj();
      obj.name = this.cityUser.value;
      this.resAddress.city = obj;
    }
    if (this.resAddress.street.name == '') {
      let obj = new AddressObj();
      obj.name = this.streetUser.value;
      this.resAddress.street = obj;
    }
    if (this.resAddress.building.name == '') {
      let obj = new AddressObj();
      obj.name = this.buildingUser.value;
      this.resAddress.building = obj;
    }
    if (this.resAddress.zipCode.name == '') {
      let obj = new AddressObj();
      obj.name = this.zipUser.value;
      this.resAddress.zipCode = obj;
    }
    if (this.resAddress.country.name == '') {
      let obj = new AddressObj();
      obj.name = this.countryUser.value;
      this.resAddress.country = obj;
    }
    console.log(this.resAddress);
  }
}
