import { Command } from "src/shared/actions/Action";

export class RemoveMessageCommand extends Command {
    constructor(payload: string){
        super('removeMessage', payload);
    }
}