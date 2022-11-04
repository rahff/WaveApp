import { Command } from "../../../shared/actions/Action";




export class GetUserCommand extends Command {
    constructor(){
        super("getUser", null);
    }
}