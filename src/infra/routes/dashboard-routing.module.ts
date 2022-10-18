import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarEventFormComponent } from '../views/components/calendar-event-form/calendar-event-form.component';
import { CalendarComponent } from '../views/components/calendar/calendar.component';
import { ContactFormComponent } from '../views/components/contact-form/contact-form.component';
import { ContactComponent } from '../views/components/contact/contact.component';
import { MessagesComponent } from '../views/components/messages/messages.component';
import { SendMailComponent } from '../views/components/send-mail/send-mail.component';
import { TodoFormComponent } from '../views/components/todo-form/todo-form.component';
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
        path: "event-form", component: CalendarEventFormComponent
      },
      {
        path: "contact-form", component: ContactFormComponent
      },
      {
        path: "add-todo", component: TodoFormComponent
      },
      {
        path: "send-email", component: SendMailComponent
      },
      {
        path: "messages", component: MessagesComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
  public static viewComponents = [
    DashboardComponent, 
    CalendarComponent, 
    ContactComponent, 
    TodoComponent, 
    CalendarEventFormComponent, 
    ContactFormComponent,
    TodoFormComponent,
    SendMailComponent,
    MessagesComponent
  ]
}
