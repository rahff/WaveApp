import { AddContactItemCommand } from "src/core/commands/contactList/AddContactItemCommand";
import { RemoveContactItemCommand } from "src/core/commands/contactList/RemoveContactItemCommand";
import { SetContactListCommand } from "src/core/commands/contactList/SetContactListCommand";
import { UpdateContactItemCommand } from "src/core/commands/contactList/UpdateContactItemCommand";
import { ContactListEffect } from "src/core/effects/ContactListEffect";
import { ContactItem } from "src/core/entities/ContactItem";
import { ContactSavedEvent } from "src/infra/events/ContactSavedEvent";
import { ContactListFakeRepository } from "src/infra/mocks/ContactListFakeRepository";
import { ContactListSelectorService } from "src/infra/services/contactList/contact-list-selector.service";
import { ContactListStateContainer } from "./ContactListStateContainer";


const contact1 = new ContactItem("tester", "testertest@gmail.com", "0569898766", "123");
const contact2 = new ContactItem("tester2", "testertest2@gmail.com", "0569398725", "456");
const contact3 = new ContactItem("tester3", "testertest3@gmail.com", "0569728714", "789");

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
        expect(stateContainer.getState().contacts[2]?.getName()).toBe("tester3");
    })

    it('should remove a contact into the list state', ()=>{
        stateContainer.dispatch(new RemoveContactItemCommand("456"));
        expect(stateContainer.getState().contacts.length).toBe(1);
        expect(stateContainer.getState().contacts[0]).toEqual(contact1);
    })

    it('should update a contact into the list state', ()=>{
        stateContainer.dispatch(new UpdateContactItemCommand(new ContactItem(contact2.getName(), "newemail@gmail.com", contact2.getTel(), contact2.getId())));
        expect(stateContainer.getState().contacts[1].getEmail()).toBe("newemail@gmail.com");
        expect(stateContainer.getState().onSuccessSave).toBeTrue();
    })

    it('should set onSuccessSave to false', ()=>{
        stateContainer.dispatch(new AddContactItemCommand(contact3));
        stateContainer.dispatch(new ContactSavedEvent());
        expect(stateContainer.getState().onSuccessSave).toBeFalse();
    })
})