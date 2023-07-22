import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

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
}
