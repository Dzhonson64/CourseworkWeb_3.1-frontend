import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validators} from '@angular/forms';

@Directive({
  selector: '[appComparePasswords]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ComparePasswordsDirective,
      multi: true
    }
  ]
})
export class ComparePasswordsDirective implements Validators {

  constructor() { }

  validate(formControl: AbstractControl): ValidationErrors {
    if(formControl.value === '3'){
      return {vali: { error: 'vali'}}
    }
    return null;
  };

}
