import { _Event } from "../../../shared/actions/Action";


export class MessageSendedEvent extends _Event {
    constructor(){
        super("messageSended", null);
    }
}