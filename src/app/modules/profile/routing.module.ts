import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SettingsComponent} from './componets/settings/settings.component';
import {ProfileLayoutComponent} from './componets/layout/profile-layout.component';
import {ProductCompanyComponent} from './componets/productCompany/components/product-company/product-company.component';
import {NewProductComponent} from './componets/productCompany/components/new-product/new-product.component';
import {EditConfigProductsComponent} from './componets/productCompany/components/edit-config-products/edit-config-products.component';
import {EdutProductComponent} from './componets/productCompany/components/new-product/edut-product/edut-product.component';
import {CatalogItemComponent} from '../userProducts/catalog-item/catalog-item.component';
import {UserTableComponent} from './componets/user-table/user-table.component';
import {AuthGuard} from '../../guards/auth.guard';
import {PurchaseComponent} from './componets/purchase/purchase.component';
import {SalesComponent} from './componets/productCompany/components/sales/sales.component';


const routes: Routes = [
  {
    path: '', component: ProfileLayoutComponent,
    canActivate: [AuthGuard], children: [
      {path: 'settings', component: SettingsComponent},
      {path: 'products', component: ProductCompanyComponent},
      {path: 'products/create', component: NewProductComponent},
      {path: 'products/config', component: EditConfigProductsComponent},
      {path: 'products/purchases', component: PurchaseComponent},
      {path: 'products/edit/:product', component: EdutProductComponent},
      {path: 'products/sales', component: SalesComponent},
      {path: 'settings/users', component: UserTableComponent}


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
export class RoutingModule {
}
