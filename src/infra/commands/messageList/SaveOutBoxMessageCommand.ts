import { IMessage } from "src/infra/models/IMessage";
import { Command } from "src/shared/actions/Action";

export class SaveOutBoxMessageCommand extends Command {
    constructor(payload: IMessage){
        super("saveOutboxMessage", payload);
    }
}