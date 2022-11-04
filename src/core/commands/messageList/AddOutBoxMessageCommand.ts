import { Command } from "../../../shared/actions/Action";
import { _Message } from "../../entities/_Message";


export class AddOutBoxMessageCommand extends Command {
    constructor(payload: _Message){
        super("addOutBoxMessage", payload);
    }
}