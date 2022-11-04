import { Command } from "../../../shared/actions/Action";




export class LoginCommand extends Command {
    constructor(payload: {password: string, email: string}){
        super("login", payload);
    }
}