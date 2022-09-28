import { Command } from "src/shared/command/Command";

export class RemoveCalendarEventCommand extends Command {
    constructor(payload: string) {
        super("removeEvent", payload);
    }
}