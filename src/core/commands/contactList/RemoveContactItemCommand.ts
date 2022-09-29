import { Command } from "src/shared/command/Command";

export class RemoveContactItemCommand extends Command {
    constructor(payload: string) {
        super("removeContact", payload);
    }
}