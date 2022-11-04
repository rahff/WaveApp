
import { CalendarRepository } from "../../core/ports/driven/CalendarRepository";
import { ICalendarEvent } from "../models/ICalendarEvent";
import { ICalendarNotification } from "../models/ICalendarNotification";
import { fakeCalendarEvent1, fakeCalendarEvent2, fakeCalendarEvent3 } from "./fake-data";



export class CalendarFakeRepository implements CalendarRepository {

    saveNotification(notification: ICalendarNotification): void {
        new Promise((resolve)=> resolve(notification));
    }

    modifyCalendarEvent(update: Partial<ICalendarEvent>): Promise<ICalendarEvent> {
        return new Promise((resolve)=> {
            const updatedEvent: ICalendarEvent = {...fakeCalendarEvent1.asDto(), ...update};
            resolve(updatedEvent);
        });
    }

    deleteCalendarEvent(calendarEventId: string): Promise<string> {
        return new Promise((resolve)=> resolve(calendarEventId));
    }
    
    saveCalendarEvent(calendarEvent: ICalendarEvent): Promise<ICalendarEvent> {
        return new Promise((resolve)=>{
            const savedEvent = {...calendarEvent, id: fakeCalendarEvent3.getId()};
            resolve(savedEvent);
        });
    }

    getCalendarEvents(): Promise<ICalendarEvent[]> {
        return new Promise((resolve)=> {
            resolve([fakeCalendarEvent1.asDto(), fakeCalendarEvent2.asDto()])
        })
    }

}