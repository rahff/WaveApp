import { ContactItem } from "src/core/entities/ContactItem";
import { Command } from "src/shared/command/Command";

export class SaveContactItemCommand extends Command {
    constructor(payload: ContactItem){
        super("saveContact", payload);
    }
}