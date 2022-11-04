import { Command } from "../../../shared/actions/Action";
import { CalendarEvent } from "../../entities/CalendarEvent";



export class AddCalendarEventCommand extends Command {
    constructor(payload: CalendarEvent){
        super("addEvent", payload);
    }
}