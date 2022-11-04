import { Command } from "../../../shared/actions/Action";
import { ITodoItem } from "../../models/ITodoItem";



export class SaveTodoListItemCommand extends Command {

    constructor(payload: ITodoItem) {
        super("saveItem", payload);
    }
}