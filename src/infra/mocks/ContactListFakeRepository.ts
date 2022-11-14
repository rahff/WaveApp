


import { Base64File } from "../../../shared/Base64File";
import { ContactListRepository } from "../../core/ports/driven/ContactListRepository";
import { IContactItem } from "../models/IContactIem";
import { generateEmail } from "../utils/generators";

import { conatct1, conatct2 } from "./fake-data";



export class ContactListFakeRepository implements ContactListRepository {

    async saveContactInfoFile(file: Base64File): Promise<IContactItem> {
        return {
            email: generateEmail(),
            id: "",
            photo: generateEmail()+".png",
            username: "Added Byfile"
        };
    }

    isExistingContactById(id: string): Promise<boolean> {
        return new Promise((resolve)=>{
            if(id === conatct1.getId() || id === conatct2.getId()) resolve(true);
            else resolve(false);
        })
    }

    isExistingContactByValues(email: string): Promise<boolean> {
        return new Promise((resolve)=> {
            if(email === conatct1.getEmail()) resolve(true);
            else resolve(false)
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