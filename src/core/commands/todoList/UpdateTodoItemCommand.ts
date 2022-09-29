import { TodoItem } from "src/core/entities/TodoItem";
import { Command } from "src/shared/command/Command";



export class UpdateTodoItemCommand extends Command {
    constructor(payload: TodoItem){
        if(!payload.id) throw new Error("cannot update item without id");
        super("updateItem", payload);
    }
}