import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../routes/app-routing.module';
import { BootComponent } from '../views/boot/boot.component';
import { DatabaseModule } from './database.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { UserModule } from './user.module';
import { SignupComponent } from '../views/signup/signup.component';
import { AppComponent } from '../views/app/app.component';
import { ReactiveFormsModule } from '@angular/forms';



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
    MatIconModule,
    UserModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
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
