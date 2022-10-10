import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from './database.module';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DatabaseModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    DatabaseModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
