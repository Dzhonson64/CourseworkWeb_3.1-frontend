import {AfterViewInit, Component, ContentChild, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import * as moment from 'moment';
import {now} from 'moment/moment';
import {GenderType} from '../../../../models/type/GenderType';
import {UserType} from '../../../../models/type/UserType';
import {ProviderDto} from '../../../../models/ProviderDto';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('login_content') login_content: ElementRef;
  type = UserType;
  hide = true;
  loginForm: FormGroup;
  userNameControl: FormControl;
  passwordControl: FormControl;
  typeControl: FormControl;
  errorMessage: string;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router,
              private _route: ActivatedRoute) {

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  submit() {
    let provider = new ProviderDto();
    provider.name = this.userNameControl.value;
    provider.password = this.passwordControl.value;
    if (this.typeControl.value == UserType.Provider) {
      this.authService.loginProvider(provider).subscribe(
        {
          next: data => {
            localStorage.setItem('name', data.name);
            localStorage.setItem('userId', data.id.toString());
            localStorage.setItem('type', UserType.Provider.toString());
            localStorage.removeItem('token');

            this.router.navigate(['/']);
          },
          error: error => {
            this.errorMessage = error.message;
            this.openSnackBar('Пользователь не найден', 'Закрыть');
          }
        });
    } else {
      this.authService.loginUser(provider).subscribe({
        next: data => {
          // @ts-ignore
          localStorage.setItem('token', data.token);
          // @ts-ignore
          localStorage.setItem('name', data.name);
          // @ts-ignore
          localStorage.setItem('userId', data.id.toString());
          localStorage.setItem('type', UserType.User.toString());
          // @ts-ignore
          localStorage.setItem('isAdmin', data.isAdmin);
          this.router.navigate(['/']);
        },
        error: error => {
          this.errorMessage = error.message;
          this.openSnackBar('Пользователь не найден', 'Закрыть');
        }
      });
    }
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.userNameControl = new FormControl('', Validators.required);
    this.typeControl = new FormControl(UserType.User);
    this.passwordControl = new FormControl('', [
      Validators.required
    ]);

  }

  createForm() {
    this.loginForm = new FormGroup({
      userName: this.userNameControl,
      password: this.passwordControl,
      typeControl: this.typeControl

    });
  }

  displayPopUpSelectMenu() {
    this.authService.togglePopUpSelectionMenu();
  }

  ngAfterViewInit(): void {
    this.authService.loginContent = this.login_content;
  }
}
