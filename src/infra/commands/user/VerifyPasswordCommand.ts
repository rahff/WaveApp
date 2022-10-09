import { Command } from "src/shared/actions/Action";



export class VerifyPasswordCommand extends Command {
    constructor(payload: {password: string, email: string}){
        super("verifyPassword", payload);
    }
}