import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../routes/app-routing.module';
import { BootComponent } from '../views/boot/boot.component';
import { DatabaseModule } from './database.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserModule } from './user.module';
import { SignupComponent } from '../views/signup/signup.component';
import { AppComponent } from '../views/app/app.component';



@NgModule({
  declarations: [
    BootComponent,
    SignupComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    DatabaseModule,
    AppRoutingModule,
    UserModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:10000'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
