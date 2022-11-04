import { Command } from "../../../shared/actions/Action";



export class RemoveCalendarEventCommand extends Command {
    constructor(payload: string) {
        super("removeEvent", payload);
    }
}