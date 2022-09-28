import { User } from "src/core/entities/User";
import { Command } from "src/shared/command/Command";



export class SetUserCommand extends Command {
    constructor(payload: User){
        super("setUser", payload);
    }
}