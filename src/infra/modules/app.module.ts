import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../routes/app-routing.module';
import { BootComponent } from '../views/boot/boot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from '../views/signup/signup.component';
import { AppComponent } from '../views/app/app.component';
import { SharedModule } from './shared.module';
import { LoginComponent } from '../views/login/login.component';
import { CoreModule } from './core.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    BootComponent,
    SignupComponent,
    LoginComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:10000'
    }),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
