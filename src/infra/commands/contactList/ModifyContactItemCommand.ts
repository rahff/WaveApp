import { ContactItem } from "src/core/entities/ContactItem";
import { Command } from "src/shared/command/Command";

export class ModifyContactItemCommand extends Command {
    constructor(payload: Partial<ContactItem>) {
        super("modifyContact", payload);
    }
}