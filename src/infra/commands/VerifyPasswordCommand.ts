import { Command } from "src/shared/command/Command";

export class VerifyPasswordCommand extends Command {
    constructor(payload: string){
        super("verifyPassword", payload);
    }
}