import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private utils:UtilsService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isAuth:boolean=false
let result:any=localStorage.getItem('userdetails')
result=this.utils.decrypt(result,environment.dataSeceretKey)
        if(result && result['isActive']){
          isAuth=true
      }
      else{
        isAuth=false
        this.router.navigate(['/login']);
      }
    return isAuth;
  }

}
