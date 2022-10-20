import { _Message } from "src/core/entities/_Message";
import { Command } from "src/shared/actions/Action";

export class AddOutBoxMessageCommand extends Command {
    constructor(payload: _Message){
        super("addOutBoxMessage", payload);
    }
}