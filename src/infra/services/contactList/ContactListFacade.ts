import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContactItem } from "src/core/entities/ContactItem";
import { Facade } from "src/shared/abstract/Facade";
import { ContactListDispatcherService } from "./contact-list-dispatcher.service";
import { ContactListSelectorService } from "./contact-list-selector.service";



@Injectable({
    providedIn: 'root'
})
export class ContactListFacade extends Facade<ContactListSelectorService> {

    constructor(dispatcher: ContactListDispatcherService){
        super(dispatcher)
    }

    public getContactList(): Observable<ContactItem[]> {
        return this.dispatcher.stateSelector.getContactList();
    }
}