import { Command } from "src/shared/command/Command";

export class ErrorEvent extends Command {
    constructor(payload: string){
        super("onError", payload);
    }
}