import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainModule} from './modules/main/main.module';
import {LoginComponent} from './modules/auth/login/login.component';
import {RegistrationComponent} from './modules/auth/registration/registration.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => MainModule
  },
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
