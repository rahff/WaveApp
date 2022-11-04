import { Command } from "../../../shared/actions/Action";



export class GetCalendarEventsCommand extends Command {
    constructor(){
        super("getEvents", null);
    }
}