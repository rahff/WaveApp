import { Command } from "../../../shared/actions/Action";


export class GetMessageListCommand extends Command {
    constructor(){
        super("getMessageList", null);
    }
}