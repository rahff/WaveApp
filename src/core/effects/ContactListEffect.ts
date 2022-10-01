import { Command } from "src/shared/command/Command";
import { AddContactItemCommand } from "../commands/contactList/AddContactItemCommand";
import { RemoveContactItemCommand } from "../commands/contactList/RemoveContactItemCommand";
import { SetContactListCommand } from "../commands/contactList/SetContactListCommand";
import { UpdateContactItemCommand } from "../commands/contactList/UpdateContactItemCommand";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../interfaces/EffectCreator";
import { ContactListPolicies } from "../policies/ContactListPolicies";
import { ContactListRepository } from "../ports/driven/ContactListRepository";



export class ContactListEffect implements EffectCreator {

    private validationPolicy: ContactListPolicies;

    constructor(private repository: ContactListRepository){
        this.validationPolicy = new ContactListPolicies(this.repository)
    }
    
    async createEffect(command: Command): Promise<Command> {
        switch (command.getName()) {
            case "getContacts":
               return this.validationPolicy.getContactList();
            case "saveContact":
                return await this.validationPolicy.saveContact(command.getPayload());
            case "deleteContact":
                return await this.validationPolicy.deleteContact(command.getPayload());
            case "modifyContact": 
                return await this.validationPolicy.modifyContact(command.getPayload());
                
            default: throw new CommandNotFoundException();
        }
    }

}