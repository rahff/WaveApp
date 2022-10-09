import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user.module';
import { DatabaseModule } from './database.module';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DatabaseModule,
    ReactiveFormsModule,
    UserModule
  ],
  exports: [
    CommonModule,
    DatabaseModule,
    ReactiveFormsModule,
    UserModule
  ]
})
export class SharedModule { }
