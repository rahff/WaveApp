import { Command } from "src/shared/actions/Action";



export class RemoveCalendarEventCommand extends Command {
    constructor(payload: string) {
        super("removeEvent", payload);
    }
}