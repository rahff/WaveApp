import { Command } from "src/shared/actions/Action";


export class GetCalendarEventsCommand extends Command {
    constructor(){
        super("getEvents", null);
    }
}