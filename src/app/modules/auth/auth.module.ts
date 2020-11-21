import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFieldCommonModule} from '../common-modules/mat-field/mat-field-common.module';
import {FormCommonModule} from '../common-modules/forms/form-common.module';
import {RouterModule} from '@angular/router';
import { SelectMenuComponent } from './select-menu/select-menu.component';
import { CompanyRegistationComponent } from './registration/company-registation/company-registation.component';


@NgModule({
  declarations: [LoginComponent, RegistrationComponent, SelectMenuComponent, CompanyRegistationComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatFieldCommonModule,
        FormCommonModule,
        RouterModule

    ]
})
export class AuthModule {


}
