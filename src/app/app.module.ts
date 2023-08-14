import {NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './non-authenticated_screens/login/login.component';
import { ForgotComponent } from './non-authenticated_screens/forgot/forgot.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SignupComponent } from './non-authenticated_screens/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonComponentsModule } from './authenticated_screens/common_components/common-components/common-components.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgxOtpInputModule,
    BrowserAnimationsModule,
    CommonComponentsModule,
  ],
  providers: [HttpClient,CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {

}
