import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  collapseSideNav$: BehaviorSubject<any> = new BehaviorSubject(true);
  toastMessageContent$: BehaviorSubject<any> = new BehaviorSubject({});
  constructor() { }
  encrypt(value : any,key:any){
    try{
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value),key).toString()
      return encrypted
    }
   catch(err){
    return null
   }
  }
  decrypt(text :any,key:any){
    try{
      const decrypted = CryptoJS.AES.decrypt(text, key);
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedText);
    }
 catch(err){
  return null
 }
  }
  getLocalstorgaeData(key:any,encryptKey:any){
    return new Promise((resolve,reject)=>{
      try{
      let details:any=localStorage.getItem(key)
      details=this.decrypt(details,encryptKey)
      resolve(details)
      }
      catch(err:any){
        console.log(err)
        reject(err)
      }
    })

  }
  collapseSideBar(value:boolean){
    this.collapseSideNav$.next(value)
  }
  getScreenList(screens:any,userRole:string,roleData:any){
    return new Promise((resolve,reject)=>{
      let list:any[]=[]
      for(let doc of screens){
            if(roleData[doc['accessKey']] && roleData[doc['accessKey']].length){
              if(roleData[doc['accessKey']].includes(userRole)){
                list.push(doc['screenData'])
              }
            }
      }
      resolve(list)
  })

  }
  enableMessageService(data:any){
    this.toastMessageContent$.next(data)
  }
  getMessageContent(){
   return this.toastMessageContent$.asObservable()
  }
}
