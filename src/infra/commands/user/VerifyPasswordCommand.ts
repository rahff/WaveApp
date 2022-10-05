import { Command } from "src/shared/command/Command";

export class VerifyPasswordCommand extends Command {
    constructor(payload: {password: string, id: string}){
        super("verifyPassword", payload);
    }
}