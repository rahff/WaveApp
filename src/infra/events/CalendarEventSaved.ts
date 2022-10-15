import { _Event } from "src/shared/actions/Action";

export class CalendarEventSaved extends _Event {
    constructor(){
        super("eventSaved", null)
    }
}