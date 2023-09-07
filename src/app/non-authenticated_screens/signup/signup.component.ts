import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiserviceService } from 'src/services/apiservice.service';
import { FirebaseService } from 'src/services/firebase.service';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:any=[
    {
      formControlName: 'name',
      label:'Name',
      controlFields: new FormControl('', [Validators.required]),
      type: 'text',
      icon:'fa fa-user',
      mandatory: true,
    },
    {
      formControlName: 'email',
      label:'Email',
      controlFields: new FormControl('', [Validators.required,Validators.email]),
      type: 'email',
      icon:'fa fa-envelope',
      mandatory: true,
    },
    {
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
  showPassword: boolean = false;
sendRequest:boolean=false
formValues=new FormGroup({
})
queryService:any
roles:any[]=[]
  constructor(
    private apis:ApiserviceService,
    private utils:UtilsService,
    private router:Router,
    private fs:FirebaseService
  ) { }

  ngOnInit(): void {
    this.queryService = environment.isHttpService
    ? this.apis
    : this.fs;
    this.formValues=new FormGroup({
    })

    for(let form of this.signupForm){
      this.formValues.addControl(form.formControlName,form.controlFields)
    }
  }
  getRoles(){
    let params:any={
      endPoint:'api/getData',
      body:
        {"collection":"Roles"}
     }
    this.queryService.getData(params).subscribe((response:any)=>{
      if(response['status']=='success'){

      }
    })
  }
  signup(formData:any){
    let values:any=formData.value
    this.sendRequest=true
     let params:any={
      endPoint:'auth/createUser',
      body:{}
     }
     if(values['password']==values['confirmPassword']){
      let requestBody:any ={...values}
      delete requestBody['confirmPassword']
    params['body']['encrypted'] =this.utils.encrypt(requestBody,environment.authenticationSecretKey)
    this.queryService.userAuthentication(params).subscribe((response:any)=>{
     let result:any=this.utils.decrypt(response['encrypted'],environment.authenticationSecretKey)
     if(result['status']=='success'){
      this.router.navigate(['/login'])
      this.sendRequest=false
     }
     else{
      this.sendRequest=false
     }
    },(err:any)=>{
      this.sendRequest=false
      console.log(err,'err')
    })
  }
}
}
