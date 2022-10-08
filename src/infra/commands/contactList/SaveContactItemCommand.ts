import { IContactItem } from "src/infra/models/IContactIem";
import { Command } from "src/shared/actions/Action";




export class SaveContactItemCommand extends Command {
    constructor(payload: IContactItem){
        super("saveContact", payload);
    }
}