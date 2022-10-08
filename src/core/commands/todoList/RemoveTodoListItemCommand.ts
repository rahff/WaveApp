import { Command } from "src/shared/actions/Action";


export class RemoveTodoListItemCommand extends Command {
    constructor(payload: string){
        super("removeItem", payload);
    }
}