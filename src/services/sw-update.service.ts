import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import {filter, first} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {

  constructor(private swUpdate :SwUpdate,private appRef:ApplicationRef) {
    if(swUpdate.isEnabled){
      this.handleUpdates()
      this.checkForUpdates()
      this.handleUnRecoverableState()
    }
    else{
      console.log("swupdate service:Service worker is not enabled")
    }
  }

  handleUpdates(){
    console.log('swupdate service: Service worker enabled,inside update function')
    // this.swUpdate.versionUpdates.pipe(
    //   filter((event:VersionEvent)=>event.type=='VERSION_READY')
    // ).subscribe((event:VersionEvent)=>{
    //   console.log(event)
    // })
    // checking all the events
    this.swUpdate.versionUpdates.subscribe((evt:VersionEvent) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`New version is detected : ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          this.askPermissionToUpdate()
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });
  }
  askPermissionToUpdate(){
     console.log('inside permission function')
     Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        const notification = new Notification('Update Available', {
          body: 'A new version of the app is available. Click to update.'
        });
        notification.onclick = () => {
          window.location.reload() // Reload the page to update
        };
      }
      else{
        if(confirm(`New version of the app is available`)){
          window.location.reload() // Reload the page to update
           }
      }
    }).catch((err)=>{
      console.log(err,'Error on notification request')
      if(confirm(`New version of the app is available`)){
        window.location.reload() // Reload the page to update
         }
    });
  }
  checkForUpdates(){
    const millisecondsInOneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const numberOfDays = 3; // Number of days
const totalMilliseconds = millisecondsInOneDay * numberOfDays;
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable))
    const intervalPeriod$=interval(totalMilliseconds)
    concat(appIsStable$,intervalPeriod$).subscribe(async()=>{
        try{
            let isUpdateAvailable= await this.swUpdate.checkForUpdate()
              console.log(isUpdateAvailable ? 'A new version of the app is  available.' : 'Already on the latest version.');
              if(isUpdateAvailable){
                this.askPermissionToUpdate()
              }
        }
        catch(err){
          console.log(`Failed to check update ${err}`)
        }
    })

  }
  handleUnRecoverableState(){
     this.swUpdate.unrecoverable.subscribe((state)=>{
      console.log(state,'Unrecoverable state')
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          const notification = new Notification('An error Occurred', {
            body: `${state.reason} Click to recover.`
          });
          notification.onclick = () => {
            window.location.reload() // Reload the page to update
          };
        }
        else{
          if(confirm(`An error occured please reload the page`)){
            window.location.reload() // Reload the page to update
             }
        }
      }).catch((err)=>{
        console.log(err,'Error on notification request')
        if(confirm(`An error occured please reload the page`)){
          window.location.reload() // Reload the page to update
           }
      });
     })
  }
}
