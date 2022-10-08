import { ITodoItem } from "src/infra/models/ITodoItem";
import { Command } from "src/shared/actions/Action";



export class SaveTodoListItemCommand extends Command {

    constructor(payload: ITodoItem) {
        super("saveItem", payload);
    }
}