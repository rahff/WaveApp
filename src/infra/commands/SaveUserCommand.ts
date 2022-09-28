import { User } from "src/core/entities/User";
import { Command } from "src/shared/command/Command";

export class SaveUserCommand extends Command {
    constructor(payload: User){
        super("saveUser", payload);
    }
}