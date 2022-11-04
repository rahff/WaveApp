import { Command } from "../../../shared/actions/Action";
import { ITodoItem } from "../../models/ITodoItem";



export class ModifyTodoItemCommand extends Command{
    constructor(payload: ITodoItem){
        super("modifyItem", payload);
    }
}