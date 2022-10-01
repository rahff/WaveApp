import { TodoItem } from "src/core/entities/TodoItem";
import { Command } from "src/shared/command/Command";

export class ModifyTodoItemCommand extends Command{
    constructor(payload: Partial<TodoItem>){
        super("modifyItem", payload);
    }
}