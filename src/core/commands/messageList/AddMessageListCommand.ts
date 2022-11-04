import { Command } from "../../../shared/actions/Action";
import { _Message } from "../../entities/_Message";


export class AddMessageListCommand extends Command {
    constructor(payload: _Message[]){
        super("addMessageList", payload);
    }
}