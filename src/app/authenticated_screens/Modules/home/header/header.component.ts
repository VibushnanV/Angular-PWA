import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isOpened:boolean=true
  constructor(private utils:UtilsService,private router:Router) {
    this.utils.getLocalstorgaeData('userdetails',environment.dataSeceretKey).then((result:any)=>{
      this.userDetails=result
    })
  }
  userDetails:any
  profile_details:any
  ngOnInit(): void {
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
    this.router.navigate([routeData['href']])

  }
}
