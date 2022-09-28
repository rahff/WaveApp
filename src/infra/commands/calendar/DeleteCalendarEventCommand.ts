import { Command } from "src/shared/command/Command";

export class DeleteCalendarEventCommand extends Command {
    constructor(payload: string) {
        super("deleteEvent", payload);
    }
}