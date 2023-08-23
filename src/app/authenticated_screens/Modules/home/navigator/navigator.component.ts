import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/services/utils.service';
import  Screens from '../../../../../assets/jsons/screens.json'
import { environment } from 'src/environments/environment';
import { ApiserviceService } from 'src/services/apiservice.service';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/services/firebase.service';
@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
   mainScreensList:any[]=[]
   userDetails:any=[]
   roles:any[]=[]
   queryService:any
  constructor(private apis:ApiserviceService,
    private utils:UtilsService,
    private router:Router,private fs:FirebaseService) {
    this.mainScreensList=[]
    utils.getLocalstorgaeData('userdetails',environment.dataSeceretKey).then((result:any)=>{
     this.userDetails=result
     utils.getLocalstorgaeData('Auth_list',environment.dataSeceretKey).then((roleData:any)=>{
    this.roles=roleData
     utils.getScreenList(Screens['mainScreens'],this.userDetails['role']['roleId'],this.roles[0])
     .then((screenData:any)=>{
       this.mainScreensList=screenData
     })
    })
  })

  }

  ngOnInit(): void {
    this.queryService = environment.isHttpService
    ? this.apis
    : this.fs;
  }

}
