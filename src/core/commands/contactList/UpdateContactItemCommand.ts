import { ContactItem } from "src/core/entities/ContactItem";
import { Command } from "src/shared/command/Command";

export class UpdateContactItemCommand extends Command {
    constructor(payload: ContactItem){
        if(!payload.id) throw new Error("cannot update item whithout id");
        super("updateContact", payload);
    }
}