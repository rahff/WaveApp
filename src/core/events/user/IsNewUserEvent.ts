import { Command } from "src/shared/command/Command";

export class IsNewUserEvent extends Command {

    constructor(payload: boolean){
        super("isNewUser", payload);
    }
}