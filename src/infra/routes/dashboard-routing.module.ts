import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarEventFormComponent } from '../views/components/calendar-event-form/calendar-event-form.component';
import { CalendarComponent } from '../views/components/calendar/calendar.component';
import { ContactComponent } from '../views/components/contact/contact.component';
import { TodoComponent } from '../views/components/todo/todo.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';


const ROUTES: Routes = [
  {
    path: "", component: DashboardComponent, children: [
      {
        path: "", pathMatch: "full", redirectTo: "calendar"
      }, 
      {
        path: "calendar", component: CalendarComponent
      },
      {
        path: "contact", component: ContactComponent
      },
      {
        path: "todo-list", component: TodoComponent
      },
      {
        path: "add-event", component: CalendarEventFormComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
  public static viewComponents = [DashboardComponent, CalendarComponent, ContactComponent, TodoComponent, CalendarEventFormComponent]
}
