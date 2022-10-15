import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DashboardRoutingModule } from '../routes/dashboard-routing.module';
import { HeaderComponent } from '../views/components/header/header.component';
import { NavBarComponent } from '../views/components/nav-bar/nav-bar.component';
import { CoreModule } from './core.module';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";



FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    HeaderComponent, 
    NavBarComponent,
    ...DashboardRoutingModule.viewComponents
  ],
  imports: [
    DashboardRoutingModule,
    CoreModule,
    FullCalendarModule
  ],
  providers: []
})
export class DashboardModule { }
