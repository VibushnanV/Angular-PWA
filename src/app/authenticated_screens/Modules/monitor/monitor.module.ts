import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorHomeComponent } from './monitor-home/monitor-home.component';


@NgModule({
  declarations: [
    MonitorHomeComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule { }
