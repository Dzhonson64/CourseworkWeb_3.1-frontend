import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './routing.module';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FirstScreenComponent } from './components/first-screen/first-screen.component';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { HttpClient, HttpParams, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { HeaderComponent } from './components/header/header.component';
import { HeaderTopComponent } from './components/header-top/header-top.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [HomeComponent,LayoutComponent, FirstScreenComponent, HeaderComponent, HeaderTopComponent, MenuComponent

    ],
  imports: [
    CommonModule,RouterModule,MainRoutingModule, FormsModule, ReactiveFormsModule, MatButtonModule, HttpClientJsonpModule, MatFormFieldModule, 
    MatIconModule, MatToolbarModule,
    MatMenuModule, MatListModule,
    MatSidenavModule,
    MatSelectModule
  ],
  providers: []
})
export class MainModule { }
