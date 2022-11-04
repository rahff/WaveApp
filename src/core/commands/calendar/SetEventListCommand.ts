import { Command } from "../../../shared/actions/Action";
import { CalendarEvent } from "../../entities/CalendarEvent";




export class SetEventListCommand extends Command {
    constructor(payload: CalendarEvent[]) {
        super("setEvents", payload);
    }
}