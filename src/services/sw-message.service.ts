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
      // this.subscribePushNotification()
    }
    else{
      console.log("swPush service:Service worker is not enabled")
    }
  }
subscribePushNotification(){
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

      },(err:any)=>{
        console.log(err)
      })

    }).catch((err)=>{
      console.log(`subscribtion failed ,${err}`)
    })
  }
  else{
    console.log("swPush service:Service worker is not enabled")
  }

  }
}
