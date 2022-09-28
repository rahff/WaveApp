import { Command } from "src/shared/command/Command";

export class GetTodoListItemsCommand extends Command {
    constructor(payload: null) {
        super("getItems", payload);
    }
}