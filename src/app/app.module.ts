import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainModule} from './modules/main/main.module';
import {AuthModule} from './modules/auth/auth.module';
import {ProfileModule} from './modules/profile/profile.module';
import {CommonModule} from '@angular/common';
import { ComparePasswordsDirective } from './directives/compare-passwords.directive';
import { DialogOverviewComponent } from './modules/common-modules/dialog-overview/dialog-overview.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ProductItemComponent } from './modules/userProducts/product-item/product-item.component';
import { CatalogItemComponent } from './modules/userProducts/catalog-item/catalog-item.component';
import {MatFieldCommonModule} from './modules/common-modules/mat-field/mat-field-common.module';
import {FormCommonModule} from './modules/common-modules/forms/form-common.module';
@NgModule({
  declarations: [
    AppComponent,
    ComparePasswordsDirective,
    DialogOverviewComponent,
    ProductItemComponent,
    CatalogItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    AuthModule,
    ProfileModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFieldCommonModule,
    FormCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [CommonModule]
})
export class AppModule {
}
