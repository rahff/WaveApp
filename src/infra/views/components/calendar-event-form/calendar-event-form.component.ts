import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModifyCalendarEventCommand } from 'src/infra/commands/calendar/ModifyCalendarEventCommand';
import { SaveCalendarEventCommand } from 'src/infra/commands/calendar/SaveCalendarEventCommand';
import { CalendarEventSaved } from 'src/infra/events/CalendarEventSaved';
import { ExceptionHandledEvent } from 'src/infra/events/ExceptionHandledEvent';
import { ICalendarEvent } from 'src/infra/models/ICalendarEvent';
import { CalendarFacade } from 'src/infra/services/calendar/CalendarFacade';
import { AlertService } from '../../services/alert.service';
import { ValidatorsExtension } from '../../services/ValidatorsExtension';
import { SubscriberComponent } from '../../SubscriberComponent';

interface DateTimeString {startDate: string, endDate: string, startTime: string, endTime: string }

@Component({
  selector: 'app-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.css']
})
export class CalendarEventFormComponent extends SubscriberComponent implements OnInit {

  public eventForm: FormGroup = new FormGroup({});
  public withNotification: boolean = false;
  public initialEventValue: ICalendarEvent | undefined = undefined;
  private initialDateValues: DateTimeString | undefined = undefined;
  constructor(private fb: FormBuilder,
              private calendarFacade: CalendarFacade,
              private alertSevice: AlertService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
                super();
              }

  public ngOnInit(): void {
    this.getInitialDateValues();
    this.addGetInitialValueListener();
    this.initForm(this.initialEventValue, this.initialDateValues);
    this.addExceptionListener();
    this.addOnSaveSuccessListener();
  }

  private getInitialDateValues(): void {
    const startDate = this.activatedRoute.snapshot.queryParamMap.get('startDate');
    const endDate = this.activatedRoute.snapshot.queryParamMap.get('endDate');
    const startTime = this.activatedRoute.snapshot.queryParamMap.get('startTime');
    const endTime = this.activatedRoute.snapshot.queryParamMap.get('endTime');
    if (startDate && endDate && startTime && endTime) {
      this.initialDateValues = {startDate: startDate, endDate: endDate, startTime: startTime, endTime: endTime };
    }else if (startDate && endDate) {
      this.initialDateValues = {startDate: startDate, endDate: endDate, startTime: "", endTime: "" };
    }
  }

  private addGetInitialValueListener(): void {
    const eventId = this.activatedRoute.snapshot.queryParamMap.get('eventId');
    
    if(eventId) {
      this.calendarFacade.getCalendarEvent().subscribe((list: ICalendarEvent[])=> {
        this.initialEventValue = list.find((item: ICalendarEvent) => item.id === eventId)
      })
    }

  }

  private addOnSaveSuccessListener(): void {
    this.subscription.add(this.calendarFacade.getOnSuccessEvent()
    .subscribe({next: this.onSaveHandler.bind(this) }));
  }

  private onSaveHandler(isSuccess: boolean): void {
    if(!isSuccess) return;
    this.calendarFacade.dispatch(new CalendarEventSaved());
    this.router.navigateByUrl('/dashboard/calendar');
  }

  private addExceptionListener(): void {
    this.subscription.add(this.calendarFacade.getException()
    .subscribe({next: this.onExceptionHandler.bind(this)}));
  }

  private onExceptionHandler(exception: {message: string} | null): void {
    if(!exception) return;
    this.calendarFacade.dispatch(new ExceptionHandledEvent())
    this.alertSevice.errorAlert(exception.message).finally();
  }

  private initForm(initialValue?: ICalendarEvent, initialDateValues?: DateTimeString): void {
    this.eventForm = this.fb.group({
      title: [initialValue?.title || '', [ValidatorsExtension.required, ValidatorsExtension.minLength(2), ValidatorsExtension.maxLength(25)]],
      startDate: [this.getDateString(initialValue?.start, initialDateValues?.startDate), [ValidatorsExtension.required, ValidatorsExtension.date]],
      startTime: [this.getTimeString(initialValue?.start, initialDateValues?.startTime), [ValidatorsExtension.required, ValidatorsExtension.dateTime]],
      endDate: [this.getDateString(initialValue?.end, initialDateValues?.endDate), [ValidatorsExtension.required, ValidatorsExtension.date]],
      endTime: [this.getTimeString(initialValue?.end, initialDateValues?.endTime), [ValidatorsExtension.required, ValidatorsExtension.dateTime]],
      notification: ["0:15", [ValidatorsExtension.dateTime]]
    })
  }

  private getDateString(date: Date | undefined, dateString: string | undefined): string {
    if(date) return date.toISOString().slice(0, 10);
    else if(dateString) return dateString;
    return "";
  }

  private getTimeString(date: Date | undefined, timeString: string | undefined): string {
    if(date) {
      const hour = date.getHours().toString()
      const minutes = date.getMinutes() < 10  
      ? date.getMinutes().toString()+"0" 
      : date.getMinutes().toString();
      return hour + ":" + minutes;
    }
    else if(timeString) return timeString;
    return "";
  }

  public onSubmit(): void {
    if(this.eventForm.valid){
      const {startEvent, endEvent} = this.getStartAndEndDateTimeOfEvent()
      const event: ICalendarEvent = {
        title: this.eventForm.get('title')?.value,
        start: startEvent,
        end: endEvent,
        id: this.initialEventValue ? this.initialEventValue.id : "",
        notification:{ 
          notificationTime: this.eventForm.get('notification')?.value || null,
          notificationDateTime: null
        }
      }
      if(!this.initialEventValue){
        this.calendarFacade.dispatch(new SaveCalendarEventCommand(event));
      }else {
        this.calendarFacade.dispatch(new ModifyCalendarEventCommand(event));
      }

    }
  }

  private getStartAndEndDateTimeOfEvent(): {startEvent: Date, endEvent: Date} {
    const startDate = this.makeDateString(this.eventForm.get('startDate')?.value);
    const startTime = this.eventForm.get('startTime')?.value;
    const endDate = this.makeDateString(this.eventForm.get('endDate')?.value);
    const endTime = this.eventForm.get('endTime')?.value;
    const startEvent = this.makeDateTime(startDate, startTime);
    const endEvent = this.makeDateTime(endDate, endTime);
    return {startEvent, endEvent}
  }

  private makeDateString(value: string): string {
    return new Date(value).toISOString().split('T')[0];
  }

  private makeDateTime(dateString: string, timeString: string): Date {
    return new Date(dateString + ' ' + timeString)
  }

}
