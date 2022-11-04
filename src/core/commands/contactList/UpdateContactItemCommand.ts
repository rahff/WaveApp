import { Command } from "../../../shared/actions/Action";
import { ContactItem } from "../../entities/ContactItem";




export class UpdateContactItemCommand extends Command {
    constructor(payload: ContactItem){
        super("updateContact", payload);
    }
}