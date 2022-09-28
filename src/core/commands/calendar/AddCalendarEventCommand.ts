import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { Command } from "src/shared/command/Command";

export class AddCalendarEventCommand extends Command {
    constructor(payload: CalendarEvent){
        super("addEvent", payload);
    }
}