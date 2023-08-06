import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigHomeComponent } from './config-home/config-home.component';

const routes: Routes = [
  {path:"",component:ConfigHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
