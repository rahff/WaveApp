import { Command } from "../../../shared/actions/Action";


export class RemoveContactItemCommand extends Command {
    constructor(payload: string) {
        super("removeContact", payload);
    }
}