import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path:'',component:HomeComponent,children:[
    {path:"",redirectTo:'dashboard',pathMatch:"full"},
    {path:"dashboard",loadChildren:()=>import('../home/dashboard/dashboard.module').then(m=>m.DashboardModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
