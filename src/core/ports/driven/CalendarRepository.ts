import { CalendarEvent } from "src/core/entities/CalendarEvent";

export interface CalendarRepository {
    getCalendarEvents(): Promise<CalendarEvent[]>;
    saveCalendarEvent(calendarEvent: CalendarEvent): Promise<CalendarEvent>;
    deleteCalendarEvent(calendarEventId: string): Promise<string>;
    modifyCalendarEvent(updated: CalendarEvent): Promise<CalendarEvent>;
    
}