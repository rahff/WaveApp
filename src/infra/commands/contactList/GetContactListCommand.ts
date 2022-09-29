import { Command } from "src/shared/command/Command";

export class GetContactListCommand extends Command {
    constructor() {
        super("getContacts", null);
    }
}