import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './routing.module';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FirstScreenComponent } from './components/first-screen/first-screen.component';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { HttpClient, HttpParams, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'
import {MatButtonModule} from '@angular/material/button';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MenuComponent } from './components/menu/menu.component';



@NgModule({
  declarations: [HomeComponent,LayoutComponent,HeaderComponent, FirstScreenComponent, MenuComponent
    ],
  imports: [
    CommonModule,RouterModule,MainRoutingModule, FormsModule, ReactiveFormsModule, MatButtonModule, HttpClientJsonpModule, MatFormFieldModule
  ],
  providers: []
})
export class MainModule { }
