import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './components/layout/layout.component';
import {HomeMainComponent} from './components/home/home-main/home-main.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: HomeMainComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
