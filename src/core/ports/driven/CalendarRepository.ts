
import { ICalendarEvent } from "src/infra/models/ICalendarEvent";
import { ICalendarNotification } from "src/infra/models/ICalendarNotification";

export interface CalendarRepository {
    getCalendarEvents(): Promise<ICalendarEvent[]>;
    saveCalendarEvent(calendarEvent: ICalendarEvent): Promise<ICalendarEvent>;
    deleteCalendarEvent(calendarEventId: string): Promise<string>;
    modifyCalendarEvent(updated: ICalendarEvent): Promise<ICalendarEvent>;
    saveNotification(notification: ICalendarNotification): void
}