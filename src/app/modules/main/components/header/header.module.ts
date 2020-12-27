import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainHeaderComponent} from './main-header.component';
import {HeaderTopComponent} from './header-top/header-top.component';
import {MenuComponent} from './toolbar/menu.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RouterModule} from '@angular/router';
import {ProfileService} from '../../../profile/services/profile.service';
import { ChildMenuComponent } from '../layout/child-menu/child-menu.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatFieldCommonModule} from '../../../common-modules/mat-field/mat-field-common.module';


@NgModule({
  declarations: [MainHeaderComponent, HeaderTopComponent, MenuComponent, ChildMenuComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule,
    MatIconModule, MatToolbarModule,
    MatMenuModule, MatListModule,
    MatSidenavModule,
    MatSelectModule, RouterModule, MatBadgeModule, MatFieldCommonModule
  ],
  exports: [MainHeaderComponent, HeaderTopComponent, MenuComponent, ChildMenuComponent],
  providers: [ProfileService]
})
export class HeaderModule {
}
