import { Command } from "../../../shared/actions/Action";



export class DeleteTodoListItemCommand extends Command {
    constructor(payload: string){
        super("deleteItem", payload);
    }
}