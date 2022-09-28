import { Command } from "src/shared/command/Command";

export class GetCalendarEventsCommand extends Command {
    constructor(){
        super("getEvents", null);
    }
}