import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
isOpened:boolean=true
  constructor(private utils:UtilsService) { }

  ngOnInit(): void {
    this.utils.collapseSideNav$.subscribe((value:boolean)=>{
     this.isOpened=value
    })
  }

}
