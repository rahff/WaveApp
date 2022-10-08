import { Command } from "src/shared/actions/Action";



export class GetTodoListItemsCommand extends Command {
    constructor(payload: null) {
        super("getItems", payload);
    }
}