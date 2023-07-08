import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './non-authenticated_screens/login/login.component';
import { ForgotComponent } from './non-authenticated_screens/forgot/forgot.component';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'Forgot',component:ForgotComponent},
  {path:"home",loadChildren:()=>import('../app/authenticated_screens/Modules/home/home.module').then(m=>m.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
