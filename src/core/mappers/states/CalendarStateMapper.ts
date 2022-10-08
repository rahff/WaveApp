import { ICalendarState } from "src/shared/abstract/ICalendarState";
import { CalendarEvent } from "../../entities/CalendarEvent";
import { CalendarState } from "../../interfaces/states/CalendarState";


export const calendarStateMapper = (userState: CalendarState): ICalendarState => {
    return {
      events: userState.events.map((event: CalendarEvent) => event.asDto()),
      onException: userState.onException
    }
}