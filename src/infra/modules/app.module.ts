import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../routes/app-routing.module';
import { BootComponent } from '../views/boot/boot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from '../views/signup/signup.component';
import { AppComponent } from '../views/app/app.component';
import { SharedModule } from './shared.module';
import { CoreModule } from './core.module';
import { ElectronModule } from './electron.module';
import { ElectronApi } from '../../../shared/ElectronApi';



@NgModule({
  declarations: [
    BootComponent,
    SignupComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    ElectronModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
