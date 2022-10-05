import { ContactItem } from "src/core/entities/ContactItem";

export interface ContactListRepository {
    getContactList(): Promise<ContactItem[]>
    saveContact(contact: ContactItem): Promise<ContactItem>;
    deleteContact(contactId: string): Promise<string>;
    modifyContact(upadated: ContactItem): Promise<ContactItem>;
    isExistingContactByValues(email: string, tel: string): Promise<boolean>;
    isExistingContactById(id: string): Promise<boolean>;
}