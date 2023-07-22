import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './non-authenticated_screens/login/login.component';
import { ForgotComponent } from './non-authenticated_screens/forgot/forgot.component';
import { AuthGuard } from 'src/services/auth.guard';
import { SignupComponent } from './non-authenticated_screens/signup/signup.component';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'forget',component:ForgotComponent},
  {path:'signUp',component:SignupComponent},
  {path:"home",loadChildren:()=>import('../app/authenticated_screens/Modules/home/home.module').then(m=>m.HomeModule),canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
