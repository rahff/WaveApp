import { _Message } from "src/core/entities/_Message";
import { Command } from "src/shared/actions/Action";

export class SetMessageListCommand extends Command {
    constructor(payload: _Message[]){
        super("setMessages", payload);
    }
}