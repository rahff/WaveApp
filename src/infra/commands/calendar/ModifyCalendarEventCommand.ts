import { ICalendarEvent } from "src/infra/models/ICalendarEvent";
import { Command } from "src/shared/command/Command";



export class ModifyCalendarEventCommand extends Command {
    constructor(payload: ICalendarEvent) {
        super("modifyEvent", payload);
    }
}