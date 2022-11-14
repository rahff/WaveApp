import { Base64File } from "../../../../shared/Base64File";
import { IContactItem } from "../../../infra/models/IContactIem";




export interface ContactListRepository {
    getContactList(): Promise<IContactItem[]>
    saveContact(contact: IContactItem): Promise<IContactItem>;
    deleteContact(contactId: string): Promise<string>;
    isExistingContactByValues(email: string): Promise<boolean>;
    isExistingContactById(id: string): Promise<boolean>;
    saveContactInfoFile(file: Base64File): Promise<IContactItem>
}