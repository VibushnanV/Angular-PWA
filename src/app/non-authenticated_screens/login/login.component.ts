import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ApiserviceService } from 'src/services/apiservice.service';
import { FirebaseService } from 'src/services/firebase.service';
import { SwMessageService } from 'src/services/sw-message.service';
import { UtilsService } from 'src/services/utils.service';
import commonValues from '../../..../../../assets/jsons/commonValues.json'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(16)]),
  remember: new FormControl(false),
})
showPassword: boolean = false;
sendRequest:boolean=false
queryService:any
messageContent=commonValues['toastConfigJon']
  constructor(
    private cookie: CookieService,
    private apis:ApiserviceService,
    private utils:UtilsService,
    private router:Router,
    private fs:FirebaseService,
    private swPushService:SwMessageService
  ) { }

  ngOnInit(): void {
    this.queryService = environment.isHttpService
    ? this.apis
    : this.fs;
    try {
      let cookieDetails: any = this.cookie.get(`userdetails`);
      cookieDetails = this.utils.decrypt(
        cookieDetails,
        environment.dataSeceretKey,
      );
      if (cookieDetails && cookieDetails != '') {
        for (let key in cookieDetails) {
          if (this.loginForm.get(key)) {
            this.loginForm.get(key)?.setValue(cookieDetails[key]);
          }
        }
      }
    } catch (err: any) {
      throw console.log('error', err);
    }
  }
  login(formData:any){
    let values:any=formData.value
    this.sendRequest=true
     let params:any={
      endPoint:'auth/login',
      body:{}
     }
     const { email, password } = values
     let requestBody:any = { email, password }
    params['body']['encrypted'] =this.utils.encrypt(requestBody,environment.authenticationSecretKey)
    this.queryService.userAuthentication(params).subscribe((response:any)=>{
     let result:any=this.utils.decrypt(response['encrypted'],environment.authenticationSecretKey)
     if(result['status']=='success'){
     let loginDetails:any=result['data'][0]
     let params:any={
      endPoint:'api/getData',
      body:
        {"collection":"Authorization"}
     }
    this.queryService.getData(params).subscribe((response:any)=>{
      if(response['status']=='success'){
        let details:any=this.utils.encrypt(response['data'],environment.dataSeceretKey)
       localStorage.setItem('Auth_list',details)
       loginDetails['isActive'] = true;
      //  let params:any={
      //   endPoint:'api/getData',
      //   body:
      //     {"collection":"Push_Subscriptions",queryParam:{email:email}
      //   }
      //  }
      // this.queryService.getData(params).subscribe((pushResponse:any)=>{
      //   if(pushResponse['status']=='success'){
      //       if(pushResponse['data'].length){
      //         loginDetails['subscriptionObject']=pushResponse['data'][0]
      //       }
      //       else{
      //         this.messageContent['summary']='customTemplate'
      //         this.messageContent['key']='customTemplate'
      //         this.messageContent['life']=0
      //         this.messageContent['sticky']=true
      //             this.utils.enableMessageService(this.messageContent)
      //       this.swPushService.handleNotifications()
      //       }
      //   }
      //   else{
      //   }
      // },(err:any)=>{
      //   console.log(err)
      // })
       loginDetails = this.utils.encrypt(
         loginDetails,
         environment.dataSeceretKey,
       );
       localStorage.setItem('userdetails', loginDetails);
       if (values.remember) {
       let UserDetails:any = this.utils.encrypt(
          values,
          environment.dataSeceretKey,
        );
        let date: any = moment().add(15, 'day').toDate();
        this.cookie.set(`userdetails`, UserDetails, date);
      } else {
        this.cookie.delete(`userdetails`);
      }
       this.router.navigate(['home'])
      }
      else{

      }
    },(err:any)=>{
      console.log(err)
    })
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
