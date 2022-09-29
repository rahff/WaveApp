import { TodoItem } from "src/core/entities/TodoItem";
import { Command } from "src/shared/command/Command";

export class ModifyTodoItemCommand extends Command{
    constructor(payload: Partial<TodoItem>){
        if(!payload.id) throw new Error("cannot modify item without id");
        super("modifyItem", payload);
    }
}