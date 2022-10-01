import { Command } from "src/shared/command/Command";

export class InvalidEventRegistration extends Command {
    constructor(payload: string){
        super("invalidEventRegistration", payload);
    }
}