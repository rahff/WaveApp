import { _Event } from "../../shared/actions/Action";

export class ContactSavedEvent extends _Event {
    constructor(){
        super("contactSaved", null)
    }
}