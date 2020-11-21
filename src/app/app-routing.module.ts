import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainModule} from './modules/main/main.module';
import {LoginComponent} from './modules/auth/login/login.component';
import {RegistrationComponent} from './modules/auth/registration/registration.component';
import {ProfileModule} from './modules/profile/profile.module';
import {LayoutComponent} from './modules/main/components/layout/layout.component';
import {HomeMainComponent} from './modules/main/components/home/home-main.component';
import {ContactComponent} from './modules/main/components/contact/contact.component';
import {CompanyRegistationComponent} from './modules/auth/registration/company-registation/company-registation.component';

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
      {path: 'company', component: CompanyRegistationComponent}
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
