import { Command } from "src/shared/command/Command";



export class DoneTodoListItemCommand extends Command {
    constructor(payload: string){
        super("doneItem", payload);
    }
}
