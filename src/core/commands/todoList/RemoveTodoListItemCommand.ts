import { Command } from "src/shared/command/Command";

export class RemoveTodoListItemCommand extends Command {
    constructor(payload: string){
        super("removeItem", payload);
    }
}