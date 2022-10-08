import { IContactItem } from "src/infra/models/IContactIem";
import { Command } from "src/shared/actions/Action";




export class ModifyContactItemCommand extends Command {
    constructor(payload: IContactItem) {
        super("modifyContact", payload);
    }
}