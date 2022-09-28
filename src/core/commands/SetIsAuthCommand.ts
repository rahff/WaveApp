import { Command } from "src/shared/command/Command";

export class SetIsAuthCommand extends Command {
    constructor(payload: boolean) {
        super("setIsAuth", payload);
    }
}