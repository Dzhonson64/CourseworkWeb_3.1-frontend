import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {now} from 'moment/moment';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {ProfileService} from '../../services/profile.service';
import {User} from '../../../../models/User';
import {StatusActive} from '../../../../models/type/StatusActive';
import {GenderType} from '../../../../models/type/GenderType';
import {UserType} from '../../../../models/type/UserType';
import {AddressUser} from '../../../../models/address/AddressUser';
import {AddressObj} from '../../../../models/address/AddressObj';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    {provide: MatFormFieldControl, useExisting: SettingsComponent},
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
export class SettingsComponent implements OnInit {


  private _fileToUpload: File = null;
  private _pathImgFile: string;
  personalDataForm: FormGroup;
  regAddressUserForm: FormGroup;
  userName: FormControl;
  userSurname: FormControl;
  userPatronymic: FormControl;
  userNickname: FormControl;
  userEmail: FormControl;
  userBirthday: FormControl;
  userPhone: FormControl;
  userPassword: FormControl;
  userGender: FormControl;
  money: FormControl;

  regionUser: FormControl;
  cityUser: FormControl;
  districtUser: FormControl;
  countryUser: FormControl;
  streetUser: FormControl;
  buildingUser: FormControl;
  apartmentUser: FormControl;


  hide = true;

  userModel: User;

  constructor(private _adapter: DateAdapter<any>, private profileService: ProfileService) {

  }

  ngOnInit(): void {
    this._adapter.setLocale('ru');
    this.createFormControls();
    this.createForm();
    this.profileService.getUser(Number(localStorage.getItem('userId'))).subscribe(value => {
      console.log(value);
      this.userName.setValue(value.name);
      this.userPhone.setValue(value.phone);
      this.userPatronymic.setValue(value.patronymic);
      this.userNickname.setValue(value.username);
      this.userEmail.setValue(value.email);
      this.userSurname.setValue(value.surname);
      this.userBirthday.setValue(value.birthday);
      this.userGender.setValue(value.male);
      this.regionUser.setValue(value.address.region.name);
      this.cityUser.setValue(value.address.city.name);
      this.countryUser.setValue(value.address.country.name);
      this.districtUser.setValue(value.address.district.name);
      this.streetUser.setValue(value.address.street.name);
      this.buildingUser.setValue(value.address.building.name);
      this.money.setValue(value.money);
    });
    this.userName.valueChanges.subscribe(value => {

    });
  }

  createFormControls() {
    this.userName = new FormControl('', [Validators.required]);
    this.userSurname = new FormControl('', [Validators.required]);
    this.userPatronymic = new FormControl('', [Validators.required]);
    this.userNickname = new FormControl('', [Validators.required]);
    this.userPhone = new FormControl('', [Validators.required, Validators.maxLength(11)]);
    this.userPassword = new FormControl('', [Validators.required]);
    this.userEmail = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.userBirthday = new FormControl(moment(now()));
    this.userGender = new FormControl(GenderType.MALE);
    this.money = new FormControl(0);


    this.regionUser = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.countryUser = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.cityUser = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.districtUser = new FormControl('', [Validators.maxLength(15)]);
    this.streetUser = new FormControl('', [Validators.required, Validators.maxLength(15)]);
    this.apartmentUser = new FormControl('', [Validators.required, Validators.maxLength(5)]);
    this.buildingUser = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  }

  createForm() {
    this.personalDataForm = new FormGroup({

      email: this.userEmail,
      userName: this.userName,
      userPatronymic: this.userPatronymic,
      userNickname: this.userNickname,
      userBirthday: this.userBirthday,
      userEmail: this.userEmail,
      userSurname: this.userSurname,
      userPhone: this.userPhone,
      userPassword: this.userPassword,
      userGender: this.userGender,
      money: this.money
    });


    this.regAddressUserForm = new FormGroup({
      regionUser: this.regionUser,
      cityUser: this.cityUser,
      districtUser: this.districtUser,
      streetUser: this.streetUser,
      apartmentUser: this.apartmentUser,
      countryUser: this.countryUser,
      buildingUser: this.buildingUser
    });
  }


  getErrorMessage(nameField: string) {
    if (this.userEmail.hasError('required')) {
      return 'Вы должны ввести поле ' + nameField;
    }

    return this.userEmail.hasError('email') ? 'Неверный ' + nameField : '';
  }

  submit() {
    let address = new AddressUser();

    let re = new AddressObj();
    re.name = this.regionUser.value;
    address.region = re;

    let re6 = new AddressObj();
    re6.name = this.countryUser.value;
    address.country = re6;

    let re2 = new AddressObj();
    re2.name = this.cityUser.value;
    address.city = re2;

    let re3 = new AddressObj();
    re3.name = this.districtUser.value;
    address.district = re3;

    let re4 = new AddressObj();
    re4.name = this.streetUser.value;
    address.street =  re4;

    let re5 = new AddressObj();
    re5.name = this.buildingUser.value;
    address.building = re5;

    let user = new User();
    user.username = this.userNickname.value;
    user.surname = this.userName.value;
    user.name = this.userName.value;
    user.patronymic = this.userPatronymic.value;
    user.phone = this.userPhone.value;
    user.birthday = this.userBirthday.value;
    user.email = this.userEmail.value;
    user.address = address;
    user.money = this.money.value;
    user.id = Number(localStorage.getItem("userId"));

console.log(user)
    this.profileService.updateUser(user).subscribe(value => {

    });
  }


  handleFileInput(event: any) {

    var blob = event.target.files[0].slice(0, event.target.files[0].size, 'image/png');
    this._fileToUpload = new File([blob], event.target.files[0].name, {type: 'image/png'});
    this._pathImgFile = URL.createObjectURL(this._fileToUpload);
    this.profileService.uploadImage(this.fileToUpload, '/user/add/avatar').subscribe(value => {

    });

  }

  get fileToUpload(): File {
    return this._fileToUpload;
  }

  set fileToUpload(value: File) {
    this._fileToUpload = value;
  }

  get pathImgFile(): string {
    return this._pathImgFile;
  }

  set pathImgFile(value: string) {
    this._pathImgFile = value;
  }

}

