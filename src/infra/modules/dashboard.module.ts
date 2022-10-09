import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DashboardRoutingModule } from '../routes/dashboard-routing.module';
import { HeaderComponent } from '../views/components/header/header.component';
import { NavBarComponent } from '../views/components/nav-bar/nav-bar.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { CoreModule } from './core.module';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarComponent } from '../views/components/calendar/calendar.component';
import { ContactComponent } from '../views/components/contact/contact.component';
import { TodoComponent } from '../views/components/todo/todo.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [HeaderComponent, DashboardComponent, NavBarComponent, CalendarComponent, ContactComponent, TodoComponent],
  imports: [
    DashboardRoutingModule,
    CoreModule,
    FullCalendarModule
  ]
})
export class DashboardModule { }
