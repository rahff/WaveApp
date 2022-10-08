import { ITodoItem } from "src/infra/models/ITodoItem";
import { Command } from "src/shared/actions/Action";




export class ModifyTodoItemCommand extends Command{
    constructor(payload: ITodoItem){
        super("modifyItem", payload);
    }
}