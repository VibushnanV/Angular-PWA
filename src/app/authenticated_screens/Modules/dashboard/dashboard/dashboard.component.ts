import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/services/utils.service';
import commonValues from '../../../../../assets/jsons/commonValues.json'
import { ApiserviceService } from 'src/services/apiservice.service';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/services/firebase.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
messageContent=commonValues['toastConfigJon']
queryService:any
userDetails:any
  constructor(private utils:UtilsService,
    private apis:ApiserviceService,
    private router:Router,
    private fs:FirebaseService) { }


  ngOnInit(): void {
    this.queryService = environment.isHttpService
    ? this.apis
    : this.fs;
    this.utils.getLocalstorgaeData('userdetails',environment.dataSeceretKey).then((result:any)=>{
      this.userDetails=result
    })
    this.messageContent['summary']='customTemplate'
    this.messageContent['detail']='successfully created Pwa with push service'
    this.messageContent['key']='default'
    this.messageContent['life']=0
    this.messageContent['sticky']=true
    this.messageContent['severity']='success'
        this.utils.enableMessageService(this.messageContent)
        console.log(navigator.userAgent)
  }
  sendNotification(){
  let params:any={
        endPoint:'api/sendNotification',
        body: {email:this.userDetails.email,payload:{
          "notification": {
              "title": "Angular News",
              "body": "Newsletter Available!",
              "icon": "assets/main-page-logo-small-hat.png",
              "vibrate": [100, 50, 100],
              "data": {
                  "dateOfArrival": Date.now(),
                  "primaryKey": 1
              },
              "actions": [{
                  "action": "explore",
                  "title": "Go to the site"
              }]
          }
      }}
        }
      this.queryService.sendNotification(params).subscribe((pushResponse:any)=>{
        console.log(pushResponse)
        if(pushResponse['status']=='success'){

        }
        else{
        }
      },(err:any)=>{
        console.log(err)
      })
  }
}
