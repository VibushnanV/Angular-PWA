import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { subscribeOn } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiserviceService } from './apiservice.service';
import { FirebaseService } from './firebase.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class SwMessageService {
queryService:any
userDetails:any
  constructor(private pushService:SwPush,private apis:ApiserviceService,private fs:FirebaseService,
    private utils:UtilsService) {
    this.utils.getLocalstorgaeData('userdetails',environment.dataSeceretKey).then((result:any)=>{
      this.userDetails=result
    })
    this.queryService = environment.isHttpService
    ? this.apis
    : this.fs;
    if(pushService.isEnabled){
      // this.checkSubscriptionStatus()
      // this.subscribePushNotification()
    }
    else{
      console.log("swPush service:Service worker is not enabled")
    }
  }
  checkSubscriptionStatus() {
    return new Promise((resolve,reject)=>{
      if(this.pushService.isEnabled){
      this.pushService.subscription.subscribe((respose:any)=>{
        console.log(respose,'subscription status')
        if(!respose){
         resolve({status:false,sub:null})
        }
        else{
          resolve({status:true,sub:respose})
        }
      })
    }
    else{
      resolve({status:false,sub:'Service worker is not enabled'})
    }
    })
  }
  unsubscribePushNotification(){
    return new Promise((resolve,reject)=>{
      if(this.pushService.isEnabled){
        this.pushService.unsubscribe().then((result:any)=>{
         console.log(result,'unsubscribed')
         resolve({status:true,message:result})
        }).catch((err)=>{
         console.log(err,'unsubscribed err')
         resolve({status:false,message:err})
        })
       }
       else{
         resolve({status:false,message:'Service worker is not enabled'})
       }
    })
  }

subscribePushNotification(){
  return new Promise((resolve,reject)=>{
  if(this.pushService.isEnabled){
    this.pushService.requestSubscription(
      {serverPublicKey:environment.PUBLIC_VAPID_KEY}
    ).then((sub:any)=>{
      let details={email:this.userDetails['email']}
      let params:any={
        endPoint:'api/addSubscribers',
        body:
          {"collection":"Push_Subscriptions",subscription:sub,details:details
        }
       }
      this.queryService.insertData(params).subscribe((response:any)=>{
        resolve({status:true,message:'Push notification subscribed'})
      },(err:any)=>{
        resolve({status:false,message:'Push notification subscription failed'})
      })

    }).catch((err)=>{
      console.log(`subscribtion failed ,${err}`)
      resolve({status:false,message:'Push notification subscription failed'})
    })
  }
  else{
    console.log("swPush service:Service worker is not enabled")
    resolve({status:false,message:'Push notification subscription failed'})
  }
})
  }

}
