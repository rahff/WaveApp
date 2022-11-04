import { Command } from "../../../shared/actions/Action";
import { IContactItem } from "../../models/IContactIem";



export class SaveContactItemCommand extends Command {
    constructor(payload: IContactItem){
        super("saveContact", payload);
    }
}