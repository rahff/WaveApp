import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Facade } from "../../../shared/abstract/Facade";
import { IContactItem } from "../../models/IContactIem";
import { ContactModule } from "../../modules/contact.module";
import { ContactListDispatcherService } from "./contact-list-dispatcher.service";
import { ContactListSelectorService } from "./contact-list-selector.service";



@Injectable({
    providedIn: ContactModule
})
export class ContactListFacade extends Facade<ContactListSelectorService> {

    constructor(dispatcher: ContactListDispatcherService){
        super(dispatcher)
    }

    public getContactList(): Observable<IContactItem[]> {
        return this.dispatcher.stateSelector.getContactList();
    }

    public getSuccessSaveEvent(): Observable<boolean> {
        return this.dispatcher.stateSelector.getSuccessSaveEvent();
    }

    public getContactItem(email: string | null): Observable<IContactItem> {
        return this.dispatcher.stateSelector.getContactItem(email);
    }
}