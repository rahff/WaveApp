import { Command } from "src/shared/command/Command";

export class GetUserCommand extends Command {
    constructor(){
        super("getUser", null);
    }
}