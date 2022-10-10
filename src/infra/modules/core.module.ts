import { NgModule } from '@angular/core';
import { CalendarModule } from './calendar.module';
import { TodoModule } from './todo.module';
import { ContactModule } from './contact.module';
import { SharedModule } from './shared.module';
import { UserModule } from './user.module';

const MODULES = [
    SharedModule,
    ContactModule,
    CalendarModule,
    TodoModule,
    UserModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class CoreModule { }
