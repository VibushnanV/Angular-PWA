import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  buttonTabs:any[]=[]
  constructor(private messageService: MessageService) { }
  @Output()sendToastResult=new EventEmitter()
  @Input('toasterData')
  set in (value:any){
   if(value.key=='default'){
    this.messageService.add(value)
   }
   else if(value.key=='customTemplate'){
    this.messageService.add(value)
   }
  }
  ngOnInit(): void {

  }
  onClose(tab?:any){
   this.messageService.clear()
   this.sendToastResult.emit({event:'onClose',data:tab})
  }
  onConfirm(tab:any){
    this.messageService.clear()
    this.sendToastResult.emit({event:'onConfirm',data:tab})
  }
}
