import { ICalendarState } from "src/shared/abstract/ICalendarState";
import { CalendarEvent } from "../../entities/CalendarEvent";
import { CalendarState } from "../../interfaces/states/CalendarState";


export const calendarStateMapper = (calendarState: CalendarState): ICalendarState => {
    return {
      events: calendarState.events.map((event: CalendarEvent) => event.asDto()),
      onException: calendarState.onException,
      onSuccessSave: calendarState.onSuccessSave
    }
}