import { Command } from "../../../shared/actions/Action";
import { TodoItem } from "../../entities/TodoItem";



export class SetTodoListItemsCommand extends Command {

    constructor(payload: TodoItem[]){
        super("setItems", payload);
    }
}




