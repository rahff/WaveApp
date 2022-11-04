import { Command } from "../../../shared/actions/Action";
import { ContactItem } from "../../entities/ContactItem";




export class SetContactListCommand extends Command {
    constructor(payload: ContactItem[]){
        super("setContacts", payload);
    }
}