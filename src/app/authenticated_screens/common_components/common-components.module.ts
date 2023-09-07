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
import {ToastModule} from 'primeng/toast';
import { ToasterComponent } from './toaster/toaster.component';
import { TableComponent } from './table/table.component';
@NgModule({
  declarations: [
    OtpInputComponent,
    DialogModalComponent,
    DropdownsComponent,
    ToasterComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    NgxOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    DialogModule,
    DropdownModule,
    ToastModule,
    MultiSelectModule
  ],
  exports:[
    OtpInputComponent,
    MatSidenavModule,
    DialogModalComponent,
    DropdownsComponent,
    ToasterComponent
  ],
  providers:[]
})
export class CommonComponentsModule { }
