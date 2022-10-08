import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { Command } from "src/shared/actions/Action";



export class SetEventListCommand extends Command {
    constructor(payload: CalendarEvent[]) {
        super("setEvents", payload);
    }
}