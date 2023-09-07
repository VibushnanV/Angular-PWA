import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  httpHeaders:any
  localUrl:any=environment.functionUrl
  constructor(private http :HttpClient,private router:Router) {
    this.httpHeaders = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("learner247@admin.com:SVusimbiu1223AN"),
      }),
    };
  }
  userAuthentication(params:any){
     return this.http.post(`${this.localUrl}/${params.endPoint}`,params.body,this.httpHeaders)
  }
  getData(params:any){
    return this.http.post(`${this.localUrl}/${params.endPoint}`,params.body,this.httpHeaders)
 }
 insertData(params:any){
  return this.http.post(`${this.localUrl}/${params.endPoint}`,params.body,this.httpHeaders)
}
sendNotification(params:any){
  return this.http.post(`${this.localUrl}/${params.endPoint}`,params.body,this.httpHeaders)
}
}
