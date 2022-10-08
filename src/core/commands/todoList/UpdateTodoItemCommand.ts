import { TodoItem } from "src/core/entities/TodoItem";
import { Command } from "src/shared/actions/Action";




export class UpdateTodoItemCommand extends Command {
    constructor(payload: TodoItem){
        super("updateItem", payload);
    }
}