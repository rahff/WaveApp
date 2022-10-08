import { calendarMapper } from "src/core/mappers/entities/CalendarMapper";
import { ICalendarEvent } from "src/infra/models/ICalendarEvent";
import { Action } from "src/shared/actions/Action";
import { AddCalendarEventCommand } from "../commands/calendar/AddCalendarEventCommand";
import { RemoveCalendarEventCommand } from "../commands/calendar/RemoveCalendarEventCommand";
import { SetEventListCommand } from "../commands/calendar/SetEventListCommand";
import { UpdateCalendarEventCommand } from "../commands/calendar/UpdateCalendarEventCommand";
import { CalendarEvent } from "../entities/CalendarEvent";
import { ErrorEvent } from "../events/shared/ErrorEvent";
import { CalendarRepository } from "../ports/driven/CalendarRepository";



export class CalendarPolicies {

    constructor(private repository: CalendarRepository){}

    async applyGetCalendarEventsPolicies(): Promise<Action> {
        const events = await this.repository.getCalendarEvents();
        const eventListEntity = events.map((event: ICalendarEvent) => calendarMapper(event))
        return new SetEventListCommand(eventListEntity);
    }

    async applySaveCalendarEventPolicies(_calendarEvent: ICalendarEvent, dateRef?: Date): Promise<Action> {
        try {
            const calendarEvent = calendarMapper(_calendarEvent);
            const invalidRegistration = await this.isInvalidRegistration(calendarEvent, dateRef);
            if(!invalidRegistration){
                const savedEvent = await this.repository.saveCalendarEvent(calendarEvent.asDto());
                const eventEntity = calendarMapper(savedEvent)
                return new AddCalendarEventCommand(eventEntity);
            }
            return invalidRegistration;
        } catch (error) {
            return new ErrorEvent("end of the event must be after his start");
        }
    }

    async applyDeleteCalendarEventPolicies(eventId: string): Promise<Action> {
        const deletedId = await this.repository.deleteCalendarEvent(eventId);
        return new RemoveCalendarEventCommand(deletedId);
    }

    async applyModifyCalendarEventPolicies(updated: ICalendarEvent): Promise<Action> {
        const updatedEvent = await this.repository.modifyCalendarEvent(updated);
        const eventEntity = calendarMapper(updatedEvent);
        return new UpdateCalendarEventCommand(eventEntity);
    }

    private async isInvalidRegistration(calendarEvent: CalendarEvent, dateRef?: Date): Promise<Action | null > {
        if(this.isInPast(calendarEvent.getStart(), dateRef)) return new ErrorEvent("event start must be in the futur");
        const allEvents = await this.repository.getCalendarEvents();
        if(this.haveEventAtSameTime(calendarEvent, allEvents)) return new ErrorEvent("cannot have two event at the same time");
        return null;
    }

    private haveEventAtSameTime(calendarEvent: CalendarEvent, eventList: ICalendarEvent[]): boolean {
        let predicateValue = false;
        eventList.forEach((event: ICalendarEvent)=>{
            if(this.checkSupperpositionTiming(calendarEvent, event)){
                predicateValue = true;
            }
        })
        return predicateValue;
    }

    private checkSupperpositionTiming(eventRef: CalendarEvent, otherEvent: ICalendarEvent): boolean {
        return this.isInPast(otherEvent.start, eventRef.getStart())
        && this.isInPast(otherEvent.end, eventRef.getEnd()) 
        && !this.isInPast(otherEvent.end, eventRef.getStart())
        || this.isInPast(otherEvent.start, eventRef.getEnd())
        && this.isInPast(eventRef.getEnd(), otherEvent.end);
    }

    private isInPast(dateTime: Date, presentRef: Date = new Date()): boolean {
        return dateTime <= presentRef;
    }
   
}