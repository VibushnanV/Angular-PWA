import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isOpened:boolean=true
  constructor(private utils:UtilsService) {
    this.utils.getLocalstorgaeData('userdetails',environment.dataSeceretKey).then((result:any)=>{
      this.userDetails=result
    })
  }
  userDetails:any
  ngOnInit(): void {

  }
  toogleSidebar(){
   this.isOpened=!this.isOpened
   this.utils.collapseSideBar(this.isOpened)

  }
}
