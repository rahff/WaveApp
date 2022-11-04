import { Command } from "../../../shared/actions/Action";



export class RemoveTodoListItemCommand extends Command {
    constructor(payload: string){
        super("removeItem", payload);
    }
}