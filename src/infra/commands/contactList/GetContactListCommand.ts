import { Command } from "src/shared/actions/Action";



export class GetContactListCommand extends Command {
    constructor() {
        super("getContacts", null);
    }
}