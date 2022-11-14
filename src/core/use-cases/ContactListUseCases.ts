
import { Base64File } from "../../../shared/Base64File";
import { SaveContactItemCommand } from "../commands/contactList/SaveContactItemCommand";
import { IContactItem } from "../../infra/models/IContactIem";
import { Action } from "../../shared/actions/Action";
import { AddContactItemCommand } from "../commands/contactList/AddContactItemCommand";
import { RemoveContactItemCommand } from "../commands/contactList/RemoveContactItemCommand";
import { SetContactListCommand } from "../commands/contactList/SetContactListCommand";
import { ExceptionEvent } from "../events/shared/ExceptionEvent";
import { contactMapper } from "../mappers/entities/ContactMapper";
import { ContactListRepository } from "../ports/driven/ContactListRepository";



export class ContactListUseCases {

    constructor(private repository: ContactListRepository){}

    async applyGetContactList(): Promise<Action> {
        const contactList = await this.repository.getContactList();
        const entityList = contactList.map((contact: IContactItem) => contactMapper(contact));
        return new SetContactListCommand(entityList);
    }

    async applySaveContact(contact: IContactItem): Promise<Action> {
        try {
            console.log("contact", contact);
            const _contact = contactMapper(contact);
            const { email } = _contact.asDto();
            
            const isExistingContact = await this.repository.isExistingContactByValues(email);
            if(isExistingContact) return new ExceptionEvent("this contact already exist with this tel or email");
            const savedContact = await this.repository.saveContact(contact);
            const savedEntity = contactMapper(savedContact);
            return new AddContactItemCommand(savedEntity);
        } catch (error: any) {
            return new ExceptionEvent(error.message);
        }
    }

    async applyDeleteContact(contactId: string): Promise<Action> {
        const isExistingContact = await this.repository.isExistingContactById(contactId);
        if(!isExistingContact) return new ExceptionEvent("this contact does not exist");
        const deletedId = await this.repository.deleteContact(contactId);
        return new RemoveContactItemCommand(deletedId);
    }

    async applySaveContactInfoFile(file: Base64File): Promise<Action> {
        if(file.filename.endsWith('.txt')){
            const result = await this.repository.saveContactInfoFile(file);
            if(result) return new SaveContactItemCommand(result);
            else return new ExceptionEvent("invalid contact-info file");
        }else return new ExceptionEvent("contact-info file must be a txt file");
    }
}