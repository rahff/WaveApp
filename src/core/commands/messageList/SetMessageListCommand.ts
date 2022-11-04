import { Command } from "../../../shared/actions/Action";
import { _Message } from "../../entities/_Message";


export class SetMessageListCommand extends Command {
    constructor(payload: _Message[]){
        super("setMessages", payload);
    }
}