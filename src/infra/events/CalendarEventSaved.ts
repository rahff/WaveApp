import { _Event } from "../../shared/actions/Action";


export class CalendarEventSaved extends _Event {
    constructor(){
        super("eventSaved", null)
    }
}