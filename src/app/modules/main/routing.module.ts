import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './components/layout/layout.component';
import {HomeMainComponent} from './components/home/home-main.component';
import {ContactComponent} from './components/contact/contact.component';
import {ProfileModule} from '../profile/profile.module';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: HomeMainComponent},
      {path: 'contact', component: ContactComponent},

    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
