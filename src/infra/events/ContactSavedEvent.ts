import { _Event } from "src/shared/actions/Action";

export class ContactSavedEvent extends _Event {
    constructor(){
        super("contactSaved", null)
    }
}