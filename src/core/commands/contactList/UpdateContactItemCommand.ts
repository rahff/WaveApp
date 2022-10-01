import { ContactItem } from "src/core/entities/ContactItem";
import { Command } from "src/shared/command/Command";

export class UpdateContactItemCommand extends Command {
    constructor(payload: ContactItem){
        super("updateContact", payload);
    }
}