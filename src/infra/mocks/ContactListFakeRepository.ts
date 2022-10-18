
import { ContactListRepository } from "src/core/ports/driven/ContactListRepository";

import { IContactItem } from "../models/IContactIem";
import { conatct1, conatct2 } from "./fake-data";



export class ContactListFakeRepository implements ContactListRepository {
    isExistingContactById(id: string): Promise<boolean> {
        return new Promise((resolve)=>{
            if(id === conatct1.getId() || id === conatct2.getId()) resolve(true);
            else resolve(false);
        })
    }

    isExistingContactByValues(email: string, tel: string): Promise<boolean> {
        return new Promise((resolve)=> {
            if(email === conatct1.getEmail() || tel === conatct1.getTel()) resolve(true);
            else resolve(false)
        })
    }

    modifyContact(upadate: IContactItem): Promise<IContactItem> {
        return new Promise((resolve)=> {
            const upadated: IContactItem = {...conatct1, ...upadate}
            resolve(upadated);
        })
    }

    deleteContact(contactId: string): Promise<string> {
        return new Promise((resolve)=> resolve(contactId));
    }

    saveContact(contact: IContactItem): Promise<IContactItem> {
        return new Promise((resolve)=> resolve(contact));
    }

    getContactList(): Promise<IContactItem[]> {
        return new Promise((resolve)=> resolve([conatct1.asDto(), conatct2.asDto()]));
    }

}