import { IContactItem } from "../../../infra/models/IContactIem";
import { Command } from "../../../shared/actions/Action";




export class SaveContactItemCommand extends Command {
    constructor(payload: IContactItem){
        super("saveContact", payload);
    }
}