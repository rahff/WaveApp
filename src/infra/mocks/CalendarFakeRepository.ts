import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { CalendarRepository } from "src/core/ports/driven/CalendarRepository";

export class CalendarFakeRepository implements CalendarRepository {

    deleteCalendarEvent(calendarEventId: string): Promise<string> {
        return new Promise((resolve)=> resolve(calendarEventId));
    }

    saveCalendarEvent(calendarEvent: CalendarEvent): Promise<CalendarEvent> {
        return new Promise((resolve)=>{
            const savedEvent = new CalendarEvent("123", calendarEvent.getEventDate(), calendarEvent.getEventTime(), calendarEvent.getTitle());
            resolve(savedEvent);
        });
    }

    getCalendarEvents(): Promise<CalendarEvent[]> {
        return new Promise((resolve)=> {
            resolve([new CalendarEvent("123", new Date(2022, 8, 22), {hour: 5, minute: 0}, "test1"), new CalendarEvent("456", new Date(), {hour: 8, minute: 0}, "test2")])
        })
    }

}