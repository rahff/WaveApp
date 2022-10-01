import { Command } from "src/shared/command/Command";



export class InvalidFormEvent extends Command {
    constructor(payload: string) {
        super("invalidForm", payload);
    }
}