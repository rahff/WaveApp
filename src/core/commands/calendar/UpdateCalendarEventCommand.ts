import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { Command } from "src/shared/actions/Action";



export class UpdateCalendarEventCommand extends Command {
    constructor(payload: CalendarEvent) {
        super("updateEvent", payload);
    }
}