import { Component, EventEmitter, Input, OnInit,Output ,OnChanges, SimpleChanges} from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  providers: [MessageService]
})
export class ToasterComponent implements OnInit {
  buttonTabs:any[]=[]
  constructor(private messageService: MessageService) { }
  @Input('toasterData')
  set in (value:any){
    this.messageService.add({...value})
  }
//   ngOnChanges(changes: SimpleChanges): void {
// this.messageService.add({...changes['in'].currentValue})
//   }
  @Output()sendToastResult=new EventEmitter()
  ngOnInit(): void {
// this.messageService.clearObserver.subscribe((res)=>{
//   console.log(res)
// })
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
