import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainModule} from './modules/main/main.module';
import {LoginComponent} from './modules/auth/components/login/login.component';
import {RegistrationComponent} from './modules/auth/components/registration/user-registration/registration.component';
import {ProfileModule} from './modules/profile/profile.module';
import {CompanyRegistrationComponent} from './modules/auth/components/registration/company-registration/company-registration.component';
import {ProductItemComponent} from './modules/userProducts/product-item/product-item.component';
import {CatalogTreeItem} from './models/CatalogTreeItem';
import {CatalogItemComponent} from './modules/userProducts/catalog-item/catalog-item.component';

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
  { path: 'me', loadChildren: () => ProfileModule},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
