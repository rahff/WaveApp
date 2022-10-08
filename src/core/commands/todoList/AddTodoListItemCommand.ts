import { Command } from "src/shared/actions/Action";
import { TodoItem } from "../../entities/TodoItem";



export class AddTodoListItemCommand extends Command {
    constructor(payload: TodoItem){
        super("addItem", payload);
    }
}