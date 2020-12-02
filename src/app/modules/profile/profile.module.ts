import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import { SettingsComponent } from './componets/settings/settings.component';
import {RoutingModule} from './routing.module';
import { ProfileLayoutComponent } from './componets/layout/profile-layout.component';
import {RouterModule} from '@angular/router';
import {HeaderModule} from '../main/components/header/header.module';
import {MenuComponent} from '../main/components/header/menu/menu.component';
import {ProfileService} from './services/profile.service';
import {MatFieldCommonModule} from '../common-modules/mat-field/mat-field-common.module';
import {FormCommonModule} from '../common-modules/forms/form-common.module';
import { LeftMenuComponent } from './componets/left-menu/left-menu.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductCompanyComponent } from './componets/productCompany/components/product-company/product-company.component';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NewProductComponent } from './componets/productCompany/components/new-product/new-product.component';
import { EditConfigProductsComponent } from './componets/edit-config-products/edit-config-products.component';
import {ColorPickerModule} from 'ngx-color-picker';
import { TreeCatalogComponent } from './componets/productCompany/components/tree-catalog/tree-catalog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    SettingsComponent,
    ProfileLayoutComponent,
    LeftMenuComponent,
    ProductCompanyComponent,
    NewProductComponent,
    EditConfigProductsComponent,
    TreeCatalogComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    RoutingModule,
    MatFieldCommonModule,
    FormCommonModule,
    HttpClientModule,
    RouterModule,
    MatSortModule,
    MatPaginatorModule,
    ColorPickerModule,
    MatDialogModule
  ],
  providers: [
    ProfileService,
    /*{ provide: LOCALE_ID, useValue: "ru-RU"},*/]
})
export class ProfileModule { }
