import { Command } from "../../../shared/actions/Action";
import { ICalendarEvent } from "../../models/ICalendarEvent";




export class SaveCalendarEventCommand extends Command {
    constructor(payload: ICalendarEvent) {
        super("saveEvent", payload);
    }
}