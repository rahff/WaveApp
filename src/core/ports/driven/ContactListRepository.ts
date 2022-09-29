import { ContactItem } from "src/core/entities/ContactItem";

export interface ContactListRepository {
    getContactList(): Promise<ContactItem[]>
    saveContact(contact: ContactItem): Promise<ContactItem>;
    deleteContact(contactId: string): Promise<string>;
    modifyContact(upadate: Partial<ContactItem>): Promise<ContactItem>
}