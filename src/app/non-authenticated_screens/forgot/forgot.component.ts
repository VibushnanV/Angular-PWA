import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxOtpInputConfig } from 'ngx-otp-input';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit,AfterViewInit {
  forgotForm=new FormGroup({
  })
  masterForm:any={
    getEmail:[
      {
        formControlName: 'email',
        label:'Email',
        controlFields: new FormControl('', [Validators.required,Validators.email]),
        type: 'email',
        icon:'fa fa-envelope'
      }
    ],
    passwordField:[ {
      formControlName: 'password',
      label:'Password',
      controlFields: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(30)]),
      type: 'password',
      mandatory: true,
    },
    {
      formControlName: 'confirmPassword',
      label:'Confirm Password',
      controlFields: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(30)]),
      type: 'password',
      mandatory: true,
    }]
  }
  showPassword: boolean = false;
  sendRequest:boolean=false
  selectedForm:any
  buttonFields:any
  showOTPField:boolean=false
  otpInputConfig:any= {
    otpLength: 6,
    autoFocus: true,
  }
  constructor() { }
  allFormValues:any={}
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.selectedForm=this.masterForm['getEmail']
    this.buttonFields={text:"Get OTP"}
    this.forgotForm=new FormGroup({
    })
    for(let form of this.selectedForm){
      this.forgotForm.addControl(form.formControlName,form.controlFields)
    }
  }
  forgot(formData:any){
    let values:any=formData.value
    this.allFormValues={...this.allFormValues,...values}
    this.showOTPField=true
    this.selectedForm=this.masterForm['passwordField']
    this.buttonFields['text']='Verify OTP'
    this.forgotForm=new FormGroup({
    })
    for(let form of this.selectedForm){
      this.forgotForm.addControl(form.formControlName,form.controlFields)
    }
  }
}
