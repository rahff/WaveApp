import { Command } from "../../../shared/actions/Action";



export class DeleteCalendarEventCommand extends Command {
    constructor(payload: string) {
        super("deleteEvent", payload);
    }
}