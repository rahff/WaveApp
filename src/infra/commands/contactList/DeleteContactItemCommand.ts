import { Command } from "src/shared/command/Command";

export class DeleteContactItemCommand extends Command {
    constructor(payload: string) {
        super("deleteContact", payload);
    }
}