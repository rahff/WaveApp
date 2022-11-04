import { Command } from "../../../shared/actions/Action";



export class GetTodoListItemsCommand extends Command {
    constructor() {
        super("getItems", null);
    }
}