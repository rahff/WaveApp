import { Command } from "src/shared/command/Command";
import { AddCalendarEventCommand } from "../commands/calendar/AddCalendarEventCommand";
import { RemoveCalendarEventCommand } from "../commands/calendar/RemoveCalendarEventCommand";
import { SetEventListCommand } from "../commands/calendar/SetEventListCommand";
import { UpdateCalendarEventCommand } from "../commands/calendar/UpdateCalendarEventCommand";
import { CalendarEvent, DateTime } from "../entities/CalendarEvent";
import { InvalidEventRegistration } from "../events/contactList/InvalidEventRegistration";
import { CalendarRepository } from "../ports/driven/CalendarRepository";

export class CalendarPolicies {

    constructor(private repository: CalendarRepository){}

    async getCalendarEvents(): Promise<Command> {
        const events = await this.repository.getCalendarEvents();
        return new SetEventListCommand(events);

    }

    async saveCalendarEvent(calendarEvent: CalendarEvent, dateRef?: Date): Promise<Command> {
        if(this.isStartInPast(calendarEvent.start, dateRef)) return new InvalidEventRegistration("event start must be in the futur");
        if(this.isEndsBeforeStarting(calendarEvent.end, calendarEvent.start)) return new InvalidEventRegistration("end of the event must be after his start");
        const allEvents = await this.repository.getCalendarEvents();
        if(this.haveEventInSameTime(calendarEvent, allEvents)) return new InvalidEventRegistration("cannot have two event at the same time");
        const savedEvent = await this.repository.saveCalendarEvent(calendarEvent);
        return new AddCalendarEventCommand(savedEvent);
    }

    async deleteCalendarEvent(eventId: string): Promise<Command> {
        const deletedId = await this.repository.deleteCalendarEvent(eventId);
        return new RemoveCalendarEventCommand(deletedId);
    }

    async modifyCalendarEvent(update: Partial<CalendarEvent>): Promise<Command> {
        const updatedEvent = await this.repository.modifyCalendarEvent(update);
        return new UpdateCalendarEventCommand(updatedEvent);
    }

    private haveEventInSameTime(calendarEvent: CalendarEvent, eventList: CalendarEvent[]): boolean {
        let predicateValue = false;
        eventList.forEach((event: CalendarEvent)=>{
            if(this.checkSupperpositionTiming(calendarEvent, event)){
                predicateValue = true;
            }
        })
        return predicateValue;
    }

    private checkSupperpositionTiming(eventRef: CalendarEvent, otherEvent: CalendarEvent): boolean {
        return !this.isStartInPast(eventRef.end, this.getDateFromDateTime(otherEvent.start))
        && this.isStartInPast(eventRef.start, this.getDateFromDateTime(otherEvent.start))
        || this.isStartInPast(eventRef.start, this.getDateFromDateTime(otherEvent.end))
        && this.isStartInPast(otherEvent.start, this.getDateFromDateTime(eventRef.start));
    }

    private isEndsBeforeStarting(endTime: DateTime, start: DateTime): boolean {
        const startTime: Date = this.getDateFromDateTime(start);
        return this.isStartInPast(endTime, startTime);
    }

    private isStartInPast(dateTime: DateTime, presentRef: Date = new Date()): boolean {
        const present: DateTime = this.getPresent(presentRef);
        return dateTime.year < present.year 
        || dateTime.year === present.year 
        && dateTime.month < present.month 
        || dateTime.year === present.year 
        && dateTime.month === present.month
        && dateTime.day < present.day
        || dateTime.year === present.year 
        && dateTime.month === present.month
        && dateTime.day === present.day
        && dateTime.hour < present.hour
        || dateTime.year === present.year 
        && dateTime.month === present.month
        && dateTime.day === present.day
        && dateTime.hour === present.hour
        && dateTime.minute <= present.minute;  
    }

    private getPresent(presentRef: Date): DateTime {
        return {
            year: presentRef.getFullYear(),
            month: presentRef.getMonth(),
            day: presentRef.getDate(),
            hour: presentRef.getHours(),
            minute: presentRef.getMinutes()
        }
    }

    private getDateFromDateTime(dateTime: DateTime): Date {
        return new Date(dateTime.year, dateTime.month, dateTime.day, dateTime.hour, dateTime.minute);
    }

   
}