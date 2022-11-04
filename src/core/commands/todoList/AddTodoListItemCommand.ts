
import { Command } from "../../../shared/actions/Action";
import { TodoItem } from "../../entities/TodoItem";



export class AddTodoListItemCommand extends Command {
    constructor(payload: TodoItem){
        super("addItem", payload);
    }
}