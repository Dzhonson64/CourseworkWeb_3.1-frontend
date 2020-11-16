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
import {UserStatus} from '../../../../models/type/UserStatus';

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

  personalDataForm: FormGroup;
  userName: FormControl;
  userSurname: FormControl;
  userPatronymic: FormControl;
  userNickname: FormControl;
  userEmail: FormControl;
  userBirthday: FormControl;
  userPhone: FormControl;
  userPassword: FormControl;
  userSex: FormControl;
  filterType = 1;
  hide = true;

  userModel: User;

  constructor(private _adapter: DateAdapter<any>, private profileService: ProfileService) {

  }

  ngOnInit(): void {
    this._adapter.setLocale('ru');
    this.createFormControls();
    this.createForm();

    this.userName.valueChanges.subscribe(value => {
      console.log(this.userName);
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
    this.userSex = new FormControl('auto');
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
      userSex: this.userSex
    });
  }


  getErrorMessage(nameField: string) {
    if (this.userEmail.hasError('required')) {
      return 'Вы должны ввести поле ' + nameField;
    }

    return this.userEmail.hasError('email') ? 'Неверный ' + nameField : '';
  }

  submit() {
    this.userModel = {
      nickName: this.userNickname.value,
      surname: this.userName.value,
      name : this.userName.value,
      patronymic: this.userPatronymic.value,
      phone: this.userPhone.value
    };
    this.profileService.sendUserData(this.userModel).subscribe(value => {
console.log("Sus")
    });
    console.log(this.personalDataForm);
  }

}

export class MyTel {
  constructor(
    public area: string,
    public exchange: string,
    public subscriber: string
  ) {
  }
}
