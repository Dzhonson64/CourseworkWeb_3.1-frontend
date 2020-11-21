import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/user-registration/registration.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFieldCommonModule} from '../common-modules/mat-field/mat-field-common.module';
import {FormCommonModule} from '../common-modules/forms/form-common.module';
import {RouterModule} from '@angular/router';
import { SelectMenuComponent } from './select-menu/select-menu.component';
import { CompanyRegistrationComponent } from './registration/company-registration/company-registration.component';


@NgModule({
  declarations: [LoginComponent, RegistrationComponent, SelectMenuComponent, CompanyRegistrationComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatFieldCommonModule,
        FormCommonModule,
        RouterModule

    ]
})
export class AuthModule {

  get


}
