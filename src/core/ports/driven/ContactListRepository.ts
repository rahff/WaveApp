import { ContactItem } from "src/core/entities/ContactItem";
import { IContactItem } from "src/infra/models/IContactIem";



export interface ContactListRepository {
    getContactList(): Promise<IContactItem[]>
    saveContact(contact: IContactItem): Promise<IContactItem>;
    deleteContact(contactId: string): Promise<string>;
    modifyContact(upadated: IContactItem): Promise<IContactItem>;
    isExistingContactByValues(email: string, tel: string): Promise<boolean>;
    isExistingContactById(id: string): Promise<boolean>;
}