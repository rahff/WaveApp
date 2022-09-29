import { ContactItem } from "src/core/entities/ContactItem";
import { Command } from "src/shared/command/Command";

export class AddContactItemCommand extends Command {
    constructor(payload: ContactItem){
        super("addContact", payload);
    }
}