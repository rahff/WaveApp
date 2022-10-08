import { ITodoItem } from "src/infra/models/ITodoItem";
import { Command } from "src/shared/command/Command";


export class SaveTodoListItemCommand extends Command {

    constructor(payload: ITodoItem) {
        super("saveItem", payload);
    }
}