import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootComponent } from '../views/boot/boot.component';
import { SignupComponent } from '../views/signup/signup.component';


const routes: Routes = [
  {
    path: "", component: BootComponent
  },
  {
    path: "signup", component: SignupComponent
  },

  {
    path: "dashboard", loadChildren: ()=> import("../modules/dashboard.module").then(m => m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
