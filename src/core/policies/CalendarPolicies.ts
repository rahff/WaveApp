import { Command } from "src/shared/command/Command";
import { AddCalendarEventCommand } from "../commands/calendar/AddCalendarEventCommand";
import { RemoveCalendarEventCommand } from "../commands/calendar/RemoveCalendarEventCommand";
import { SetEventListCommand } from "../commands/calendar/SetEventListCommand";
import { UpdateCalendarEventCommand } from "../commands/calendar/UpdateCalendarEventCommand";
import { CalendarEvent } from "../entities/CalendarEvent";
import { InvalidEventRegistration } from "../events/calendar/InvalidEventRegistration";
import { CalendarRepository } from "../ports/driven/CalendarRepository";



export class CalendarPolicies {

    constructor(private repository: CalendarRepository){}

    async applyGetCalendarEventsPolicies(): Promise<Command> {
        const events = await this.repository.getCalendarEvents();
        return new SetEventListCommand(events);
    }

    async applySaveCalendarEventPolicies(calendarEvent: CalendarEvent, dateRef?: Date): Promise<Command> {
        const invalidRegistration = await this.isInvalidRegistration(calendarEvent, dateRef);
        if(!invalidRegistration){
            const savedEvent = await this.repository.saveCalendarEvent(calendarEvent);
            return new AddCalendarEventCommand(savedEvent);
        }
        return invalidRegistration;
    }

    async applyDeleteCalendarEventPolicies(eventId: string): Promise<Command> {
        const deletedId = await this.repository.deleteCalendarEvent(eventId);
        return new RemoveCalendarEventCommand(deletedId);
    }

    async applyModifyCalendarEventPolicies(updated: CalendarEvent): Promise<Command> {
        const updatedEvent = await this.repository.modifyCalendarEvent(updated);
        return new UpdateCalendarEventCommand(updatedEvent);
    }

    private async isInvalidRegistration(calendarEvent: CalendarEvent, dateRef?: Date): Promise<Command | null > {
        if(this.isInPast(calendarEvent.start, dateRef)) return new InvalidEventRegistration("event start must be in the futur");
        if(this.isEndsBeforeStarting(calendarEvent.end, calendarEvent.start)) return new InvalidEventRegistration("end of the event must be after his start");
        const allEvents = await this.repository.getCalendarEvents();
        if(this.haveEventAtSameTime(calendarEvent, allEvents)) return new InvalidEventRegistration("cannot have two event at the same time");
        return null;
    }

    private haveEventAtSameTime(calendarEvent: CalendarEvent, eventList: CalendarEvent[]): boolean {
        let predicateValue = false;
        eventList.forEach((event: CalendarEvent)=>{
            if(this.checkSupperpositionTiming(calendarEvent, event)){
                predicateValue = true;
            }
        })
        return predicateValue;
    }

    private checkSupperpositionTiming(eventRef: CalendarEvent, otherEvent: CalendarEvent): boolean {
        return this.isInPast(otherEvent.start, eventRef.start)
        && this.isInPast(otherEvent.end, eventRef.end) 
        && !this.isInPast(otherEvent.end, eventRef.start)
        || this.isInPast(otherEvent.start, eventRef.end)
        && this.isInPast(eventRef.end, otherEvent.end);
    }

    private isEndsBeforeStarting(endTime: Date, start: Date): boolean {
        return this.isInPast(endTime, start);
    }

    private isInPast(dateTime: Date, presentRef: Date = new Date()): boolean {
        return dateTime <= presentRef;
    }
   
}