import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseModule } from './database.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DatabaseModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    DatabaseModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
