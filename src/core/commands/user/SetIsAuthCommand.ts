import { Command } from "../../../shared/actions/Action";



export class SetIsAuthCommand extends Command {
    constructor(payload: boolean) {
        super("setIsAuth", payload);
    }
}