import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './componets/settings/settings.component';
import {RoutingModule} from './routing.module';
import { LayoutComponent } from './componets/layout/layout.component';
import {RouterModule} from '@angular/router';
import {HeaderModule} from '../main/components/header/header.module';
import {MenuComponent} from '../main/components/header/menu/menu.component';
import {ProfileService} from './services/profile.service';
import {MatFieldCommonModule} from '../common-modules/mat-field/mat-field-common.module';
import {FormCommonModule} from '../common-modules/forms/form-common.module';
import { LeftMenuComponent } from './componets/left-menu/left-menu.component';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    SettingsComponent,
    LayoutComponent,
    LeftMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    RoutingModule,
    MatFieldCommonModule,
    FormCommonModule,
    HttpClientModule
  ],
  providers: [ProfileService]
})
export class ProfileModule { }