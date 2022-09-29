import { ContactItem } from "src/core/entities/ContactItem";
import { ContactListRepository } from "src/core/ports/driven/ContactListRepository";
import { conatct1, conatct2 } from "./fake-data";

export class ContactListFakeRepository implements ContactListRepository {

    modifyContact(upadate: Partial<ContactItem>): Promise<ContactItem> {
        return new Promise((resolve)=> {
            const upadated: ContactItem = {...conatct1, ...upadate}
            resolve(upadated);
        })
    }

    deleteContact(contactId: string): Promise<string> {
        return new Promise((resolve)=> resolve(contactId));
    }

    saveContact(contact: ContactItem): Promise<ContactItem> {
        return new Promise((resolve)=> resolve(contact));
    }

    getContactList(): Promise<ContactItem[]> {
        return new Promise((resolve)=> resolve([conatct1, conatct2]));
    }

}