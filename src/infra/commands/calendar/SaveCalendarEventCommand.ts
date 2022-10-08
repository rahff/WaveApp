import { ICalendarEvent } from "src/infra/models/ICalendarEvent";
import { Command } from "src/shared/actions/Action";




export class SaveCalendarEventCommand extends Command {
    constructor(payload: ICalendarEvent) {
        super("saveEvent", payload);
    }
}