import { Command } from "../../../shared/actions/Action";
import { IContactItem } from "../../models/IContactIem";




export class ModifyContactItemCommand extends Command {
    constructor(payload: IContactItem) {
        super("modifyContact", payload);
    }
}