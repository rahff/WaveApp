import { TodoItem } from "src/core/entities/TodoItem";
import { Command } from "src/shared/command/Command";


export class SaveTodoListItemCommand extends Command {

    constructor(payload: TodoItem) {
        super("saveItem", payload);
    }
}