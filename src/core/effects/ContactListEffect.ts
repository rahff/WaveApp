import { Command } from "src/shared/command/Command";
import { AddContactItemCommand } from "../commands/contactList/AddContactItemCommand";
import { RemoveContactItemCommand } from "../commands/contactList/RemoveContactItemCommand";
import { SetContactListCommand } from "../commands/contactList/SetContactListCommand";
import { UpdateContactItemCommand } from "../commands/contactList/UpdateContactItemCommand";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../interfaces/EffectCreator";
import { ContactListRepository } from "../ports/driven/ContactListRepository";



export class ContactListEffect implements EffectCreator {

    constructor(private repository: ContactListRepository){}
    
    async createEffect(command: Command): Promise<Command> {
        switch (command.getName()) {
            case "getContacts":
                const contactList = await this.repository.getContactList();
                return new SetContactListCommand(contactList);
            case "saveContact":
                const savedContact = await this.repository.saveContact(command.getPayload());
                return new AddContactItemCommand(savedContact);
            case "deleteContact":
                const deletedId = await this.repository.deleteContact(command.getPayload());
                return new RemoveContactItemCommand(deletedId);
            case "modifyContact": 
                const updatedContact = await this.repository.modifyContact(command.getPayload());
                return new UpdateContactItemCommand(updatedContact);
            default: throw new CommandNotFoundException();
        
        }
    }

}