import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainModule} from './modules/main/main.module';
import {LoginComponent} from './modules/auth/login/login.component';
import {RegistrationComponent} from './modules/auth/registration/user-registration/registration.component';
import {ProfileModule} from './modules/profile/profile.module';
import {LayoutComponent} from './modules/main/components/layout/layout.component';
import {HomeMainComponent} from './modules/main/components/home/home-main.component';
import {ContactComponent} from './modules/main/components/contact/contact.component';
import {CompanyRegistrationComponent} from './modules/auth/registration/company-registration/company-registration.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => MainModule
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registration', children: [
      {path: 'user', component: RegistrationComponent},
      {path: 'company', component: CompanyRegistrationComponent}
    ]
  },
  {
    path: 'test', loadChildren: () => ProfileModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
