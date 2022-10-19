import { Command } from "src/shared/actions/Action";

export class GetMessageListCommand extends Command {
    constructor(){
        super("getMessageList", null);
    }
}