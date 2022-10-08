import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { Command } from "src/shared/actions/Action";



export class AddCalendarEventCommand extends Command {
    constructor(payload: CalendarEvent){
        super("addEvent", payload);
    }
}