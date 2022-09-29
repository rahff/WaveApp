import { ContactItem } from "src/core/entities/ContactItem";
import { Command } from "src/shared/command/Command";

export class ModifyContactItemCommand extends Command {
    constructor(payload: Partial<ContactItem>) {
        if(!payload.id) throw new Error("cannot modify item without id");
        super("modifyContact", payload);
    }
}