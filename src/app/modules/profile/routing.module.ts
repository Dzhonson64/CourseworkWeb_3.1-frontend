import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SettingsComponent} from './componets/settings/settings.component';
import {ProfileLayoutComponent} from './componets/layout/profile-layout.component';
import {ProductCompanyComponent} from './componets/productCompany/components/product-company/product-company.component';


const routes: Routes = [
  {
    path: '', component: ProfileLayoutComponent, children: [
      {path: 'settings', component: SettingsComponent},
      {path: 'products', component: ProductCompanyComponent}
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RoutingModule { }
