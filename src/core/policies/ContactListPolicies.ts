import { DeleteContactItemCommand } from "src/infra/commands/contactList/DeleteContactItemCommand";
import { Command } from "src/shared/command/Command";
import { AddContactItemCommand } from "../commands/contactList/AddContactItemCommand";
import { RemoveContactItemCommand } from "../commands/contactList/RemoveContactItemCommand";
import { SetContactListCommand } from "../commands/contactList/SetContactListCommand";
import { UpdateContactItemCommand } from "../commands/contactList/UpdateContactItemCommand";
import { ContactItem } from "../entities/ContactItem";
import { CanotModifyItemEvent } from "../events/shared/CanotModifyItemEvent";
import { ItemAlreadyExistEvent } from "../events/shared/ItemAlreadyExistEvent";
import { ItemNotExistEvent } from "../events/shared/ItemNotExistEvent";
import { ContactListRepository } from "../ports/driven/ContactListRepository";



export class ContactListPolicies {

    constructor(private repository: ContactListRepository){}

    async applyGetContactListPolicies(): Promise<Command> {
        const contactList = await this.repository.getContactList();
        return new SetContactListCommand(contactList);
    }

    async applySaveContactPolicies(contact: ContactItem): Promise<Command> {
        const { email, tel } = contact;
        const isExistingContact = await this.repository.isExistingContactByValues(email, tel);
        if(isExistingContact) return new ItemAlreadyExistEvent("this contact already exist with this tel or email");
        const savedContact = await this.repository.saveContact(contact);
        return new AddContactItemCommand(savedContact);
    }

    async applyDeleteContactPolicies(contactId: string): Promise<Command> {
        const isExistingContact = await this.repository.isExistingContactById(contactId);
        if(!isExistingContact) return new ItemNotExistEvent("this contact does not exist");
        const deletedId = await this.repository.deleteContact(contactId);
        return new RemoveContactItemCommand(deletedId);
    }

    async applyModifyContactPolicies(update: Partial<ContactItem>): Promise<Command> {
        if(!update.id) return new CanotModifyItemEvent("cannot modify item without identifier")
        const updatedContact = await this.repository.modifyContact(update);
        return new UpdateContactItemCommand(updatedContact);
    }
}