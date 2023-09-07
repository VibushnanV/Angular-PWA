import { Component,OnInit } from '@angular/core';
import { SwMessageService } from 'src/services/sw-message.service';
import { SwUpdateService } from 'src/services/sw-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  title = 'tracker-pwa';
  ngOnInit(): void {
  }
  constructor(private swUpdateService:SwUpdateService,private swPushService:SwMessageService){
  }
}
