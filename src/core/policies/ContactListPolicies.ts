import { contactMapper } from "src/core/mappers/entities/ContactMapper";
import { IContactItem } from "src/infra/models/IContactIem";
import { Action } from "src/shared/actions/Action";
import { AddContactItemCommand } from "../commands/contactList/AddContactItemCommand";
import { RemoveContactItemCommand } from "../commands/contactList/RemoveContactItemCommand";
import { SetContactListCommand } from "../commands/contactList/SetContactListCommand";
import { UpdateContactItemCommand } from "../commands/contactList/UpdateContactItemCommand";
import { ErrorEvent } from "../events/shared/ErrorEvent";
import { ContactListRepository } from "../ports/driven/ContactListRepository";



export class ContactListPolicies {

    constructor(private repository: ContactListRepository){}

    async applyGetContactListPolicies(): Promise<Action> {
        const contactList = await this.repository.getContactList();
        const entityList = contactList.map((contact: IContactItem) => contactMapper(contact));
        return new SetContactListCommand(entityList);
    }

    async applySaveContactPolicies(contact: IContactItem): Promise<Action> {
        try {
            const _contact = contactMapper(contact);
            const { email, tel } = _contact.asDto();
            const isExistingContact = await this.repository.isExistingContactByValues(email, tel);
            if(isExistingContact) return new ErrorEvent("this contact already exist with this tel or email");
            const savedContact = await this.repository.saveContact(contact);
            const savedEntity = contactMapper(savedContact);
            return new AddContactItemCommand(savedEntity);
        } catch (error: any) {
            return new ErrorEvent(error.message);
        }
    }

    async applyDeleteContactPolicies(contactId: string): Promise<Action> {
        const isExistingContact = await this.repository.isExistingContactById(contactId);
        if(!isExistingContact) return new ErrorEvent("this contact does not exist");
        const deletedId = await this.repository.deleteContact(contactId);
        return new RemoveContactItemCommand(deletedId);
    }

    async applyModifyContactPolicies(updated: IContactItem): Promise<Action> {
        if(!updated.id) return new ErrorEvent("cannot modify item without identifier")
        const updatedContact = await this.repository.modifyContact(updated);
        const updatedEntity = contactMapper(updatedContact)
        return new UpdateContactItemCommand(updatedEntity);
    }
}