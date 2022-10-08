import { ContactItem } from "src/core/entities/ContactItem";
import { Command } from "src/shared/actions/Action";


export class AddContactItemCommand extends Command {
    constructor(payload: ContactItem){
        super("addContact", payload);
    }
}