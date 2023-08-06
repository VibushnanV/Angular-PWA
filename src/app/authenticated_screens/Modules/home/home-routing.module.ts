import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path:'',component:HomeComponent,children:[
    {path:"",redirectTo:'dashboard',pathMatch:"full"},
    {path:"dashboard",loadChildren:()=>import('../../Modules/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    {path:"monitor",loadChildren:()=>import('../../Modules/monitor/monitor.module').then(m=>m.MonitorModule)},
    {path:"configuration",loadChildren:()=>import('../../Modules/configuration/configuration.module').then(m=>m.ConfigurationModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
