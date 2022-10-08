import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { ICalendarEvent } from "../../../infra/models/ICalendarEvent";

export const calendarMapper = (pojo: ICalendarEvent): CalendarEvent => {
    return new CalendarEvent(pojo.title, pojo.start, pojo.end, pojo.id);
}