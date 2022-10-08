import { DeleteContactItemCommand } from "src/infra/commands/contactList/DeleteContactItemCommand";
import { contactMapper } from "src/core/mappers/entities/ContactMapper";
import { IContactItem } from "src/infra/models/IContactIem";
import { Command } from "src/shared/command/Command";
import { AddContactItemCommand } from "../commands/contactList/AddContactItemCommand";
import { RemoveContactItemCommand } from "../commands/contactList/RemoveContactItemCommand";
import { SetContactListCommand } from "../commands/contactList/SetContactListCommand";
import { UpdateContactItemCommand } from "../commands/contactList/UpdateContactItemCommand";
import { ContactItem } from "../entities/ContactItem";
import { CanotModifyItemEvent } from "../events/shared/CanotModifyItemEvent";
import { ItemAlreadyExistEvent } from "../events/shared/ItemAlreadyExistEvent";
import { ItemNotExistEvent } from "../events/shared/ItemNotExistEvent";
import { ErrorEvent } from "../events/shared/ErrorEvent";
import { ContactListRepository } from "../ports/driven/ContactListRepository";



export class ContactListPolicies {

    constructor(private repository: ContactListRepository){}

    async applyGetContactListPolicies(): Promise<Command> {
        const contactList = await this.repository.getContactList();
        const entityList = contactList.map((contact: IContactItem) => contactMapper(contact));
        return new SetContactListCommand(entityList);
    }

    async applySaveContactPolicies(contact: IContactItem): Promise<Command> {
        try {
            const _contact = contactMapper(contact);
            const { email, tel } = _contact.asDto();
            const isExistingContact = await this.repository.isExistingContactByValues(email, tel);
            if(isExistingContact) return new ItemAlreadyExistEvent("this contact already exist with this tel or email");
            const savedContact = await this.repository.saveContact(contact);
            const savedEntity = contactMapper(savedContact);
            return new AddContactItemCommand(savedEntity);
        } catch (error: any) {
            return new ErrorEvent(error.message);
        }
    }

    async applyDeleteContactPolicies(contactId: string): Promise<Command> {
        const isExistingContact = await this.repository.isExistingContactById(contactId);
        if(!isExistingContact) return new ItemNotExistEvent("this contact does not exist");
        const deletedId = await this.repository.deleteContact(contactId);
        return new RemoveContactItemCommand(deletedId);
    }

    async applyModifyContactPolicies(updated: IContactItem): Promise<Command> {
        if(!updated.id) return new CanotModifyItemEvent("cannot modify item without identifier")
        const updatedContact = await this.repository.modifyContact(updated);
        const updatedEntity = contactMapper(updatedContact)
        return new UpdateContactItemCommand(updatedEntity);
    }
}