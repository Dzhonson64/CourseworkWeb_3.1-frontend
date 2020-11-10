import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from './componets/settings/settings.component';
import {LayoutComponent} from './componets/layout/layout.component';


const routes: Routes = [
  {
    path: 'me', component: LayoutComponent, children: [
      {path: '', component: SettingsComponent}
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RoutingModule { }
