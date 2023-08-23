import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/services/utils.service';
import  commonValues from '../../../../../assets/jsons/commonValues.json'
import { FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/services/apiservice.service';
import { FirebaseService } from 'src/services/firebase.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOpened:boolean=true
  constructor(private utils:UtilsService,private router:Router,
    private apis:ApiserviceService,private fs:FirebaseService
   ) {
    this.utils.getLocalstorgaeData('userdetails',environment.dataSeceretKey).then((result:any)=>{
      this.userDetails=result
    })
  }
  userDetails:any
  profile_details:any
  openModal:boolean=false
  modalConfigJson:any=commonValues['modalConfigJson']
  modalContent:any={}
  updatePasswordForm:any[]=[
    {
      formControlName: 'email',
      label:'Email',
      controlFields: new FormControl('', [Validators.required,Validators.email]),
      type: 'email',
      icon:'fa fa-envelope',
      mandatory: true,
    },{
    formControlName: 'oldPassword',
    label:'Old Password',
    controlFields: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(30)]),
    type: 'password',
    mandatory: true,
  },
  {
    formControlName: 'newPassword',
    label:'New Password',
    controlFields: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(30)]),
    type: 'password',
    mandatory: true,
  }]
  queryService:any
  ngOnInit(): void {
    this.queryService = environment.isHttpService
    ? this.apis
    : this.fs;
    this.profile_details={
      userFirstLetter:(this.userDetails.email.split('@')[0].split('')[0]).toUpperCase(),
      name:this.userDetails.name,
      role: this.userDetails.role,
      email:this.userDetails['email'],
      buttonTabs:
      [
       {href:'changepassword',label:'Change Password',type:"popup",fontAwesome:'fa fa-key'},
      {href:'login',label:'Logout',type:'route',fontAwesome:'fa fa-sign-out'}]
      ,
      version:'Version 1.0'
    }
  }
  toogleSidebar(){
   this.isOpened=!this.isOpened
   this.utils.collapseSideBar(this.isOpened)

  }
  navigate(routeData:any){
    if(routeData['href']=='login'){
      localStorage.removeItem("Auth_list")
      localStorage.removeItem('userdetails');
    }
    if(routeData['type']=='route'){
    this.router.navigate([routeData['href']])
    }
    else{
      if(routeData['href']=='changepassword'){
          this.modalContent={...this.modalConfigJson}
          this.modalContent['visible']=true
          this.modalContent['draggable']=false
          this.modalContent['header']='Change Password'
          this.modalContent['style']={width: '40vw'}
          this.modalContent['footer']={
            enable:true,
            buttonTabs:[{type:'submit',text:"Update Password",icon:'fa fa-refresh'},{type:"close",text:"Cancel"}]
          }
          this.updatePasswordForm[0]['controlFields'].setValue(this.userDetails.email)
          this.updatePasswordForm[0]['controlFields'].disable()
          this.modalContent['data']={
            type:'form',
            formFields:this.updatePasswordForm
          }
          this.modalContent['position']='bottom-right'
          this.openModal=true
      }
    }
  }
  modalEvents(event:any){
console.log(event)
if(event['type']=='Modal_Closed'){
  this.openModal=false
}
else if(event['type']=='submit'){
  this.changePassword(event['data'])
}
  }
  changePassword(formData:any){
    let values:any=formData.value
     let params:any={
      endPoint:'auth/changePassword',
      body:{}
     }
     let requestBody:any ={...values,...{email:this.userDetails['email']}}
     params['body']['encrypted'] =this.utils.encrypt(requestBody,environment.authenticationSecretKey)
     this.queryService.userAuthentication(params).subscribe((response:any)=>{
      let result:any=this.utils.decrypt(response['encrypted'],environment.authenticationSecretKey)
      console.log(result)
      if(result['status']=='success'){
        this.openModal=false
      }
      else{

      }
    },(err:any)=>{
      console.log(err)
    })
  }
}
