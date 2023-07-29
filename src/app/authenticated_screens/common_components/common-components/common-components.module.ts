import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpInputComponent } from './otp-input/otp-input.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OtpInputComponent
  ],
  imports: [
    CommonModule,
    NgxOtpInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    OtpInputComponent
  ]
})
export class CommonComponentsModule { }
