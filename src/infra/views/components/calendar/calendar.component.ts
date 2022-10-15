import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/angular';
import { GetCalendarEventsCommand } from 'src/infra/commands/calendar/GetCalendarEventsCommand';
import { ICalendarEvent } from 'src/infra/models/ICalendarEvent';
import { CalendarFacade } from 'src/infra/services/calendar/CalendarFacade';
import { SubscriberComponent } from '../../SubscriberComponent';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent extends SubscriberComponent implements OnInit {

  public calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    eventBackgroundColor: "#5e72e4",
    initialView: 'dayGridMonth',
    events: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventClassNames: "flex-wrap",
    firstDay: 1,
  }
  constructor(private calendarFacade: CalendarFacade,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.calendarFacade.dispatch(new GetCalendarEventsCommand());
    this.addListenerForCalendarEvent();
  }

  private addListenerForCalendarEvent(): void {
    this.subscription.add(this.calendarFacade.getCalendarEvent()
    .subscribe({next: this.setEventList.bind(this)}));
  }

  private setEventList(list: ICalendarEvent[]): void {
    this.calendarOptions.events = list;
  }

  public handleDateSelect(arg: DateSelectArg): void {
    const startDate = arg.start;
    const endDate = arg.end;
    if(startDate < new Date()) return;
    if(!startDate.getHours()){
      startDate.setHours(12);
    }
    const startDateStr = startDate.toISOString().slice(0,10);
    const endDateStr = endDate.toISOString().slice(0,10);
    if(endDate.getDate() > startDate.getDate()){
      //view mounth
      this.router.navigate(["/dashboard", "event-form"], {queryParams: {"startDate": startDateStr, "endDate": startDateStr}})
    }else{
      //view week
      const startTimeStr = arg.start.toLocaleTimeString().slice(0,5);
      const endTimeStr = arg.end.toLocaleTimeString().slice(0,5);
      this.router.navigate(["/dashboard", "event-form"], {queryParams: {"startDate": startDateStr, "endDate": endDateStr, "startTime": startTimeStr, "endTime": endTimeStr}})
    }
  }
  
  public handleEventClick(arg: EventClickArg): void {
    const eventID = arg.event._def.publicId
    this.router.navigate(["/dashboard", "event-form"], {queryParams: {"eventId": arg.event._def.publicId}})
  }

}
