import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { CommonComponentsModule } from '../../common_components/common-components/common-components.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavigatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    CommonComponentsModule
  ]
})
export class HomeModule { }
