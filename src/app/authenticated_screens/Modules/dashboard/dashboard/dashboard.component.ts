import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/services/utils.service';
import commonValues from '../../../../../assets/jsons/commonValues.json'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
messageContent=commonValues['toastConfigJon']
  constructor(private utils:UtilsService) { }

  ngOnInit(): void {
    this.messageContent['summary']='customTemplate'
    this.messageContent['key']='customTemplate'
    this.messageContent['life']=1000000
        this.utils.enableMessageService(this.messageContent)
  }

}
