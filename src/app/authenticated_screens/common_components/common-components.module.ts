import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpInputComponent } from './otp-input/otp-input.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
@NgModule({
  declarations: [
    OtpInputComponent,
    DialogModalComponent,
    DropdownsComponent
  ],
  imports: [
    CommonModule,
    NgxOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule
  ],
  exports:[
    OtpInputComponent,
    MatSidenavModule,
    DialogModalComponent,
    DropdownsComponent
  ],
  providers:[]
})
export class CommonComponentsModule { }
