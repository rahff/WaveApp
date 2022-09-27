import { Command } from "src/shared/command/Command";
import { ITodoItem } from "../interfaces/ITodoItem";


export class SaveTodoListItemCommand extends Command<ITodoItem> {

    constructor(payload: ITodoItem) {
        super("saveItem", payload);
    }
}