import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorHomeComponent } from './monitor-home/monitor-home.component';

const routes: Routes = [
  {path:"",component:MonitorHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
