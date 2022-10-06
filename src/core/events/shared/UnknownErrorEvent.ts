import { Command } from "src/shared/command/Command";

export class UnknownErrorEvent extends Command {
    constructor(payload: string){
        super("onError", payload);
    }
}