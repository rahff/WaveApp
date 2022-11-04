import { Command } from "../../../shared/actions/Action";
import { ICalendarEvent } from "../../models/ICalendarEvent";




export class ModifyCalendarEventCommand extends Command {
    constructor(payload: ICalendarEvent) {
        super("modifyEvent", payload);
    }
}