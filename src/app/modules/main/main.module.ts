import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MainRoutingModule} from './routing.module';
import {LayoutComponent} from './components/layout/layout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientJsonpModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {HeaderModule} from './components/header/header.module';
import {HomeModule} from './components/home/home.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [LayoutComponent, FooterComponent

    ],
  imports: [
    // tslint:disable-next-line:max-line-length
    CommonModule, RouterModule, MainRoutingModule, FormsModule, ReactiveFormsModule, MatButtonModule, HttpClientJsonpModule, MatFormFieldModule,
    MatIconModule, MatToolbarModule,
    MatMenuModule, MatListModule,
    MatSidenavModule,
    MatSelectModule,
    HeaderModule,
    HomeModule
  ],
  providers: []
})
export class MainModule { }
