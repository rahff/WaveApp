import { Command } from "../../../shared/actions/Action";
import { User } from "../../entities/User";


export class SetUserCommand extends Command {
    constructor(payload: User){
        super("setUser", payload);
    }
}