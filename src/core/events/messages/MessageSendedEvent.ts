import { _Event } from "src/shared/actions/Action";

export class MessageSendedEvent extends _Event {
    constructor(){
        super("messageSended", null);
    }
}