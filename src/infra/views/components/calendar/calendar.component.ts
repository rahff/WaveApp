import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
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
    initialView: 'dayGridMonth',
    events: [], // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
  }
  constructor(private calendarFacade: CalendarFacade) {
    super()
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

}
