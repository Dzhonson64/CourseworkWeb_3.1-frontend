import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {now} from 'moment/moment';
import {GenderType} from '../../../../../../models/type/GenderType';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  newProductFormGroup: FormGroup;
  nameProduct: FormControl;
  nameRootCatalog: FormControl;

  selectedValue: string;
  foods = ["раз", "два", "три"]
  constructor() {
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  private createFormControls() {
    this.nameProduct = new FormControl('', [Validators.required]);
    this.nameRootCatalog = new FormControl('', [Validators.required]);
  }

  private createForm() {
    this.newProductFormGroup = new FormGroup({
      nameProduct: this.nameProduct,
      nameRootCatalog: this.nameRootCatalog
    });
  }

  submit() {

  }
}
