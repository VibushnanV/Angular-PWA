import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { CommonComponentsModule } from '../../common_components/common-components.module';
import { RouterModule } from '@angular/router';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
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
    CommonComponentsModule,
    DynamicDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[DialogService,MessageService]
})
export class HomeModule {
  constructor() {
    defineElement(lottie.loadAnimation);

  }

 }
