import { Command } from "src/shared/command/Command";

export class ExceptionThrowedEvent extends Command {
    constructor(){
        super("exceptionThrowed", null);
    }
}