import { Command } from "src/shared/command/Command";
import { TodoItem } from "../entities/TodoItem";

export class AddTodoListItemCommand extends Command {
    constructor(payload: TodoItem){
        super("addItem", payload);
    }
}