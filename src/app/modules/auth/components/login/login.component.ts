import {AfterViewInit, Component, ContentChild, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import * as moment from 'moment';
import {now} from 'moment/moment';
import {GenderType} from '../../../../models/type/GenderType';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('login_content') login_content: ElementRef;

  hide = true;
  loginForm: FormGroup;
  userNameControl: FormControl;
  passwordControl: FormControl;


  constructor(private authService: AuthService) {

  }

  submit() {
    console.log(this.loginForm);
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.userNameControl = new FormControl('', Validators.required);
    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[0-9])')
    ]);

  }

  createForm() {
    this.loginForm = new FormGroup({
      userName: this.userNameControl,
      password: this.passwordControl

    });
  }

  displayPopUpSelectMenu() {
    this.authService.togglePopUpSelectionMenu();
  }

  ngAfterViewInit(): void {
    this.authService.loginContent = this.login_content;
  }
}
