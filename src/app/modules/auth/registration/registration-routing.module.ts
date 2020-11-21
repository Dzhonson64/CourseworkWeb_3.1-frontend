import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from '../../main/components/layout/layout.component';
import {HomeMainComponent} from '../../main/components/home/home-main.component';
import {ContactComponent} from '../../main/components/contact/contact.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: HomeMainComponent},
      {path: 'contact', component: ContactComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class RegistrationRoutingModule { }
