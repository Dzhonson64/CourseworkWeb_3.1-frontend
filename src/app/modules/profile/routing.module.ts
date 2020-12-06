import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SettingsComponent} from './componets/settings/settings.component';
import {ProfileLayoutComponent} from './componets/layout/profile-layout.component';
import {ProductCompanyComponent} from './componets/productCompany/components/product-company/product-company.component';
import {NewProductComponent} from './componets/productCompany/components/new-product/new-product.component';
import {EditConfigProductsComponent} from './componets/productCompany/components/edit-config-products/edit-config-products.component';


const routes: Routes = [
  {
    path: '', component: ProfileLayoutComponent, children: [
      {path: 'settings', component: SettingsComponent},
      {path: 'products', component: ProductCompanyComponent, children: [
          {path: 'create', component: NewProductComponent},

        ]
      },
      {path: 'products/config', component: EditConfigProductsComponent}


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
