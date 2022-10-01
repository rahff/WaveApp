import { Command } from "src/shared/command/Command";



export class ItemAlreadyExistEvent extends Command {
    constructor(payload: string) {
        super("itemAlreadyExist", payload);
    }
}