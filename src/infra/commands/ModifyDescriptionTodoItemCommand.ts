import { Command } from "src/shared/command/Command";

export class ModifyDescriptionTodoItemCommand extends Command{
    constructor(payload: {id: string, update: string}){
        super("modifyItem", payload);
    }
}