import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { catchError, firstValueFrom, lastValueFrom, map, Observable, of } from "rxjs";
import { ContactItem } from "src/core/entities/ContactItem";
import { User } from "src/core/entities/User";
import { ContactListRepository } from "src/core/ports/driven/ContactListRepository";
import { DatabaseModule } from "../modules/database.module";
import { generateId } from "../utils/generateId";

@Injectable({
    providedIn: DatabaseModule
})
export class ContactListRepositoryAdapter implements ContactListRepository {

    constructor(private service: NgxIndexedDBService){}

    async getContactList(): Promise<ContactItem[]> {
        return firstValueFrom(this.service.getAll<ContactItem>("contact")
        .pipe(catchError(()=> {throw new Error("something goes wrong")})));
    }

    async saveContact(contact: ContactItem): Promise<ContactItem> {
        contact.id = generateId();
        return firstValueFrom(this.service.add("contact", contact)
        .pipe(catchError(()=> {throw new Error("failed to save")})));
    }

    async deleteContact(contactId: string): Promise<string> {
        const isDeleted = await firstValueFrom(this.performDeletion(contactId), {defaultValue: null});
        if(isDeleted) return contactId;
        return "";
    }

    private performDeletion(id: string): Observable<boolean> {
        return this.service.delete("contact", id)
        .pipe(map(()=> true), catchError(()=> of(false)));
    }

    async modifyContact(upadated: ContactItem): Promise<ContactItem> {
        return firstValueFrom(this.service.update("contact", upadated)
        .pipe(catchError(()=> {throw new Error("failed to update")})));
    }

    async isExistingContactByValues(email: string, tel: string): Promise<boolean> {
        const isExistByEmail = await firstValueFrom(this.service.getByIndex('contact', 'email', email));
        const isExistByTel = await firstValueFrom(this.service.getByIndex('contact', 'tel', tel));
        if(isExistByEmail || isExistByTel) return true;
        return false;
    }

    async isExistingContactById(id: string): Promise<boolean> {
        const isExisting = await firstValueFrom(this.service.getByID("contact", id)
        .pipe(catchError(()=> {throw new Error("somethig goes wrong")})));
        if(isExisting) return true;
        return false;
    }
}