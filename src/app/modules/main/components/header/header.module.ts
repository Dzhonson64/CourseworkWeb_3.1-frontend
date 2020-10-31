import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainHeaderComponent} from './main-header/main-header.component';
import {HeaderTopComponent} from './header-top/header-top.component';
import {MenuComponent} from './menu/menu.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [MainHeaderComponent, HeaderTopComponent, MenuComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule,
    MatIconModule, MatToolbarModule,
    MatMenuModule, MatListModule,
    MatSidenavModule,
    MatSelectModule
  ],
  exports: [MainHeaderComponent, HeaderTopComponent, MenuComponent]
})
export class HeaderModule {
}
