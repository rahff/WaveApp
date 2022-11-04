import { ICalendarEvent } from "../../../infra/models/ICalendarEvent";
import { CalendarEvent } from "../../entities/CalendarEvent";



export const calendarMapper = (pojo: ICalendarEvent): CalendarEvent => {
    if(pojo.notification) {
        const calendarEvent = new CalendarEvent(pojo.title, pojo.start, pojo.end, pojo.id);
        calendarEvent.setNotification(pojo.notification)
        return calendarEvent;
    }
    return new CalendarEvent(pojo.title, pojo.start, pojo.end, pojo.id);
}