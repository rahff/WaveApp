import { Command } from "src/shared/actions/Action";




export class DoneTodoListItemCommand extends Command {
    constructor(payload: string){
        super("doneItem", payload);
    }
}
