import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/services/utils.service';
import commonValues from '../../../../assets/jsons/commonValues.json'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
isOpened:boolean=true
showToaster=true
messageContent={}
  constructor(private utils:UtilsService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.utils.collapseSideNav$.subscribe((value:boolean)=>{
     this.isOpened=value
    })
    this.utils.getMessageContent().subscribe((response:any)=>{
      if(response && response.key){
        this.showToaster=false
        setTimeout(()=>{
          this.showToaster=true
          this.messageContent=response
        },10)

      }
    })
  }


}
