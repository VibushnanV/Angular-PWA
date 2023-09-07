import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/services/utils.service';
import commonValues from '../../../../assets/jsons/commonValues.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
isOpened:boolean=true
showToaster=false
messageContent={}
  constructor(private utils:UtilsService) { }

  ngOnInit(): void {
    this.utils.collapseSideNav$.subscribe((value:boolean)=>{
     this.isOpened=value
    })
    this.utils.getMessageContent().subscribe((response:any)=>{
      if(response && response.key){
      this.showToaster=true
      this.messageContent=response
      }
    })
  }


}
