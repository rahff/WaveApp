import { Command } from "../../../shared/actions/Action";
import { CalendarEvent } from "../../entities/CalendarEvent";




export class UpdateCalendarEventCommand extends Command {
    constructor(payload: CalendarEvent) {
        super("updateEvent", payload);
    }
}