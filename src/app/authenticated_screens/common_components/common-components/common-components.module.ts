import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpInputComponent } from './otp-input/otp-input.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    OtpInputComponent
  ],
  imports: [
    CommonModule,
    NgxOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule
  ],
  exports:[
    OtpInputComponent,
    MatSidenavModule
  ]
})
export class CommonComponentsModule { }
