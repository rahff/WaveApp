import { Command } from "src/shared/command/Command";

export class DeleteTodoListItemCommand extends Command {
    constructor(payload: string){
        super("deleteItem", payload);
    }
}