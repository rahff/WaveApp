import { Command } from "src/shared/actions/Action";



export class DeleteContactItemCommand extends Command {
    constructor(payload: string) {
        super("deleteContact", payload);
    }
}