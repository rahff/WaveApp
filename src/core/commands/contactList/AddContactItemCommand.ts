import { Command } from "../../../shared/actions/Action";
import { ContactItem } from "../../entities/ContactItem";


export class AddContactItemCommand extends Command {
    constructor(payload: ContactItem){
        super("addContact", payload);
    }
}