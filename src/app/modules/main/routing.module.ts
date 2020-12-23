import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './components/layout/layout.component';
import {HomeMainComponent} from './components/home/home-main.component';
import {ContactComponent} from './components/contact/contact.component';
import {ProfileModule} from '../profile/profile.module';
import {CatalogItemComponent} from '../userProducts/catalog-item/catalog-item.component';
import {ProductItemComponent} from '../userProducts/product-item/product-item.component';
import {BucketComponent} from '../bucket/bucket.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: HomeMainComponent},
      {path: 'user/:id/bucket', component: BucketComponent},
      {path: 'contact', component: ContactComponent},
      {
        path: 'prod/:catalog', children: [
          {path: '', component: CatalogItemComponent},
          {path: ':product', component: ProductItemComponent}
        ]
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
