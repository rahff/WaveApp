import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootComponent } from '../views/boot/boot.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { LoginComponent } from '../views/login/login.component';
import { SignupComponent } from '../views/signup/signup.component';

const routes: Routes = [
  {
    path: "", component: BootComponent
  },
  {
    path: "signup", component: SignupComponent
  },
  {
    path: "dashboard", component: DashboardComponent
  },
  {
    path: "login", component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
