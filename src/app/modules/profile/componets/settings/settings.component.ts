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
import {GenderType} from '../../../../models/type/GenderType';

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
  userName: FormControl;
  userSurname: FormControl;
  userPatronymic: FormControl;
  userNickname: FormControl;
  userEmail: FormControl;
  userBirthday: FormControl;
  userPhone: FormControl;
  userPassword: FormControl;
  userGender: FormControl;
  userSnils: FormControl;
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
    this.userSnils = new FormControl('', [Validators.required]);
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
      userSnils: this.userSnils
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
      phone: this.userPhone.value,
      birthday: this.userBirthday.value,
      gender: this.userGender.value,
      password: this.userPassword.value,
      email: this.userEmail.value,
      snils: this.userSnils.value
    };
    this.profileService.saveUserData(this.userModel).subscribe(value => {

    });
  }


  handleFileInput(event: any) {

    var blob = event.target.files[0].slice(0, event.target.files[0].size, 'image/png');
    this._fileToUpload = new File([blob], event.target.files[0].name, {type: 'image/png'});
    this._pathImgFile = URL.createObjectURL(this._fileToUpload);
    this.profileService.uploadImage(this.fileToUpload).subscribe(value => {

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

