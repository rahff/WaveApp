import { TodoItem } from "src/core/entities/TodoItem";
import { Command } from "src/shared/actions/Action";




export class SetTodoListItemsCommand extends Command {

    constructor(payload: TodoItem[]){
        super("setItems", payload);
    }
}




