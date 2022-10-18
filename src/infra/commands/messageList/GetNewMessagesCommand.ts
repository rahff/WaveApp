import { Command } from "src/shared/actions/Action";

export class GetNewMessagesCommand extends Command {
    constructor(){
        super("getNewMessages", null);
    }
}