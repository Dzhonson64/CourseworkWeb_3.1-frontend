import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/user-registration/registration.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFieldCommonModule} from '../common-modules/mat-field/mat-field-common.module';
import {FormCommonModule} from '../common-modules/forms/form-common.module';
import {RouterModule} from '@angular/router';
import {CompanyRegistrationComponent} from './components/registration/company-registration/company-registration.component';
import {SelectMenuComponent} from './components/select-menu/select-menu.component';
import {AuthService} from './services/auth.service';
import {FindAddressService} from '../common-service/find-address.service';


@NgModule({
  declarations: [LoginComponent, RegistrationComponent, SelectMenuComponent, CompanyRegistrationComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatFieldCommonModule,
    FormCommonModule,
    RouterModule

  ],
  providers: [AuthService, FindAddressService]
})
export class AuthModule {


}
