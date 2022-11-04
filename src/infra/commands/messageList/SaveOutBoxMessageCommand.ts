import { Command } from "../../../shared/actions/Action";
import { IMessage } from "../../models/IMessage";


export class SaveOutBoxMessageCommand extends Command {
    constructor(payload: IMessage){
        super("saveOutboxMessage", payload);
    }
}