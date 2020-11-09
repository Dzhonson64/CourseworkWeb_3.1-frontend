import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  hide = true;
  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({

      'userName': new FormControl('', Validators.required),
      'password': new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[0-9])')
      ])
    });
  }

  submit() {
    console.log(this.myForm);
  }

  ngOnInit(): void {
  }

}
