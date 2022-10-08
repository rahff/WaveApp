import { Command } from "src/shared/actions/Action";



export class GetUserCommand extends Command {
    constructor(){
        super("getUser", null);
    }
}