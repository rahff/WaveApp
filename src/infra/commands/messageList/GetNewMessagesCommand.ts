import { Command } from "src/shared/actions/Action";

export class GetNewMessagesCommand extends Command {
    constructor(payload: string){
        super("getNewMessages", payload);
    }
}