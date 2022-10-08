import { ContactItem } from "src/core/entities/ContactItem";
import { Command } from "src/shared/actions/Action";



export class SetContactListCommand extends Command {
    constructor(payload: ContactItem[]){
        super("setContacts", payload);
    }
}