import { IContactItem } from "src/infra/models/IContactIem";
import { Command } from "src/shared/command/Command";



export class SaveContactItemCommand extends Command {
    constructor(payload: IContactItem){
        super("saveContact", payload);
    }
}