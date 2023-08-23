import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { environment } from 'src/environments/environment';
import { ApiserviceService } from 'src/services/apiservice.service';
import { FirebaseService } from 'src/services/firebase.service';
import { UtilsService } from 'src/services/utils.service';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
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
    otpForm:[{
      formControlName: 'otp',
      label:'OTP',
      controlFields: new FormControl('', [Validators.required]),
      type: 'otp',
      icon:'fa fa-envelope'
    }],
    passwordField:[
      {
        formControlName: 'email',
        label:'Email',
        controlFields: new FormControl('', [Validators.required,Validators.email]),
        type: 'email',
        icon:'fa fa-envelope'
      },{
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
  queryService:any
  @ViewChild("ngxOtp", { static: false }) otpInput: any;
  constructor(private utils:UtilsService,private apis:ApiserviceService,private router:Router,
    private fs:FirebaseService) { }
  allFormValues:any={}


  ngOnInit(): void {
    this.queryService = environment.isHttpService
    ? this.apis
    : this.fs;
    this.selectedForm=this.masterForm['getEmail']
    this.buttonFields={text:"Get OTP",endPoint:'verification/generateOtp',id:"generateOtp"}
    this.forgotForm=new FormGroup({
    })
    for(let form of this.selectedForm){
      this.forgotForm.addControl(form.formControlName,form.controlFields)
    }
  }
  editEmail(){
    this.showOTPField=false
    this.selectedForm=this.masterForm['getEmail']
    this.buttonFields={text:"Get OTP",endPoint:'verification/generateOtp',id:"generateOtp"}
    this.forgotForm=new FormGroup({
    })
    for(let form of this.selectedForm){
      this.forgotForm.addControl(form.formControlName,form.controlFields)
    }
    this.forgotForm.get('email')?.setValue(this.allFormValues['email'])
  }
  otpChanges(event:any){
    this.forgotForm.get('otp')?.setValue(Number(event))
  }
  forgot(formData:any){
    let values:any=formData.value
    this.sendRequest=true
    this.allFormValues={...this.allFormValues,...values}
    let params:any={}
    let requestBody:any
    if(this.buttonFields['id']=='generateOtp'){
      requestBody=values
    }
    else if(this.buttonFields['id']=='verifyOtp'){
    requestBody=this.allFormValues
    }
    else if(this.buttonFields['endPoint']=='forgotPassword'){
     requestBody={email:this.allFormValues['email'],password:this.allFormValues['password']}
    }
    params={
      endPoint:this.buttonFields['endPoint'],
      body:{}
     }
    params['body']['encrypted'] =this.utils.encrypt(requestBody,environment.authenticationSecretKey)
    this.queryService.userAuthentication(params).subscribe((response:any)=>{
     let result:any=this.utils.decrypt(response['encrypted'],environment.authenticationSecretKey)
     if(result['status']=='success'){
      let data:any=result['data']
      if(this.buttonFields['id']=='generateOtp'){
      this.showOTPField=true
      this.buttonFields={text:"Verify OTP",endPoint:'verification/verifyOtp',id:"verifyOtp"}
      this.selectedForm=this.masterForm['otpForm']
      this.forgotForm=new FormGroup({
      })
      for(let form of this.selectedForm){
        this.forgotForm.addControl(form.formControlName,form.controlFields)
      }
      this.forgotForm.get('otp')?.setValue(data['otp'])
      setTimeout(()=>{
        for(let [index,value] of this.otpInput['ngxOtpArrayControls'].entries()){
          let array:any=JSON.stringify(data['otp']).split('')
         value.setValue(Number(array[index]))
          this.otpInput['ngxOtpArray']['value'][index]=Number(array[index])
        }

        console.log(this.otpInput)
      },2000)
    }
    else if(this.buttonFields['id']=='verifyOtp'){
      this.showOTPField=false
      this.selectedForm=this.masterForm['passwordField']
      this.buttonFields={text:"Update Password",endPoint:'auth/forgotPassword'}
      this.forgotForm=new FormGroup({
      })
      for(let form of this.selectedForm){
        this.forgotForm.addControl(form.formControlName,form.controlFields)
      }
      this.forgotForm.get('email')?.setValue(this.allFormValues['email'])
      this.forgotForm.get('email')?.disable()
    }
    else if(this.buttonFields['endPoint']=='forgotPassword'){
      this.router.navigate(['/login'])
    }
    this.sendRequest=false
     }
     else{
      this.sendRequest=false
     }
    },(err:any)=>{
      console.log(err)
      this.sendRequest=false
    })
  }
  resendOtp(){
    this.sendRequest=true
    let params:any={}
    let requestBody:any = {email:this.allFormValues['email']}
    params={
      endPoint:'generateOtp',
      body:{}
     }
    params['body']['encrypted'] =this.utils.encrypt(requestBody,environment.authenticationSecretKey)
    this.apis.userAuthentication(params).subscribe((response:any)=>{
     let result:any=this.utils.decrypt(response['encrypted'],environment.authenticationSecretKey)
     if(result['status']=='success'){
      let data:any=result['data']
      this.otpInput.clear()
      this.forgotForm.get('otp')?.setValue(data['otp'])
      for(let [index,controls] of this.otpInput['ngxOtpArrayControls'].entries()){
        let array:any=JSON.stringify(data['otp']).split('')
          controls.setValue(Number(array[index]))
          this.otpInput['ngxOtpArray']['value'][index]=Number(array[index])
      }
      this.sendRequest=false
     }
    })
  }
}
