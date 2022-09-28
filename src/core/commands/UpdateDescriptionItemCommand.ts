import { Command } from "src/shared/command/Command";



export class UpdateDescriptionItemCommand extends Command {
    constructor(payload: {id: string, update: string}){
        super("updateDescriptionItem", payload);
    }
}