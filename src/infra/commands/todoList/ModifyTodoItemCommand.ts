import { ITodoItem } from "src/infra/models/ITodoItem";
import { Command } from "src/shared/command/Command";



export class ModifyTodoItemCommand extends Command{
    constructor(payload: ITodoItem){
        super("modifyItem", payload);
    }
}