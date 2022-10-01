import { Command } from "src/shared/command/Command";



export class ItemNotExistEvent extends Command {
    constructor(payload: string) {
        super("itemNotExist", payload);
    }
}