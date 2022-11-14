
import { ContactSavedEvent } from "../../../infra/events/ContactSavedEvent";
import { GenericEventHandledEvent } from "../../../infra/events/GenericEventHandledEvent";
import { ContactListFakeRepository } from "../../../infra/mocks/ContactListFakeRepository";
import { ContactListSelectorService } from "../../../infra/services/contactList/contact-list-selector.service";
import { AddContactItemCommand } from "../../commands/contactList/AddContactItemCommand";
import { RemoveContactItemCommand } from "../../commands/contactList/RemoveContactItemCommand";
import { SetContactListCommand } from "../../commands/contactList/SetContactListCommand";
import { ContactListEffect } from "../../effects/ContactListEffect";
import { ContactItem } from "../../entities/ContactItem";
import { ContactListStateContainer } from "./ContactListStateContainer";


const contact1 = new ContactItem("tester", "testertest@gmail.com", "123");
const contact2 = new ContactItem("tester2", "testertest2@gmail.com", "456");
const contact3 = new ContactItem("tester3", "testertest3@gmail.com", "789");

describe('ContactListStateContainer', ()=> {

    let stateContainer: ContactListStateContainer;
    let stateSelector: ContactListSelectorService;
    beforeEach(()=>{
        stateSelector = new ContactListSelectorService()
        stateContainer = new ContactListStateContainer(new ContactListEffect(new ContactListFakeRepository()), stateSelector);
        stateContainer.dispatch(new SetContactListCommand([contact1, contact2]));
    })

    it('should set contactList into the state', ()=> {
        stateContainer.dispatch(new SetContactListCommand([contact1]));
        expect(stateContainer.getState().contacts).toEqual([contact1]);
    })

    it('should add a contact item into state list', ()=>{
        stateContainer.dispatch(new AddContactItemCommand(contact3));
        expect(stateContainer.getState().onSuccessSave).toBeTrue();
        expect(stateContainer.getState().contacts[2]?.getUsername()).toBe("tester3");
    })

    it('should remove a contact into the list state', ()=>{
        stateContainer.dispatch(new RemoveContactItemCommand("456"));
        expect(stateContainer.getState().contacts.length).toBe(1);
        expect(stateContainer.getState().contacts[0]).toEqual(contact1);
    })

    it('should set onSuccessSave to false', ()=>{
        stateContainer.dispatch(new AddContactItemCommand(contact3));
        stateContainer.dispatch(new ContactSavedEvent());
        expect(stateContainer.getState().onSuccessSave).toBeFalse();
    })
})