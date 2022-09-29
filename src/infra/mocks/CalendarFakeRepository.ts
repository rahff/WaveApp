import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { CalendarRepository } from "src/core/ports/driven/CalendarRepository";
import { fakeCalendarEvent1, fakeCalendarEvent2 } from "./fake-data";



export class CalendarFakeRepository implements CalendarRepository {

    modifyCalendarEvent(update: Partial<CalendarEvent>): Promise<CalendarEvent> {
        return new Promise((resolve)=> {
            const updatedEvent: CalendarEvent = {...fakeCalendarEvent1, ...update};
            resolve(updatedEvent);
        });
    }

    deleteCalendarEvent(calendarEventId: string): Promise<string> {
        return new Promise((resolve)=> resolve(calendarEventId));
    }
    
    saveCalendarEvent(calendarEvent: CalendarEvent): Promise<CalendarEvent> {
        return new Promise((resolve)=>{
            const savedEvent = {...calendarEvent, id: fakeCalendarEvent2.id};
            resolve(savedEvent);
        });
    }

    getCalendarEvents(): Promise<CalendarEvent[]> {
        return new Promise((resolve)=> {
            resolve([fakeCalendarEvent1, fakeCalendarEvent2])
        })
    }

}