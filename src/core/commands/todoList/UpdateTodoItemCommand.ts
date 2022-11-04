import { Command } from "../../../shared/actions/Action";
import { TodoItem } from "../../entities/TodoItem";




export class UpdateTodoItemCommand extends Command {
    constructor(payload: TodoItem){
        super("updateItem", payload);
    }
}