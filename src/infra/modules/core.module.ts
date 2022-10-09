import { NgModule } from '@angular/core';
import { CalendarModule } from './calendar.module';
import { TodoModule } from './todo.module';
import { ContactModule } from './contact.module';
import { UserModule } from './user.module';
import { SharedModule } from './shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ContactModule,
    CalendarModule,
    TodoModule
  ],
  exports: [SharedModule]
})
export class CoreModule { }
