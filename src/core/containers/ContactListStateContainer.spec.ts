import { ContactListFakeRepository } from "src/infra/mocks/ContactListFakeRepository";
import { ContactListSelectorService } from "src/infra/services/contactList/contact-list-selector.service";
import { AddContactItemCommand } from "../commands/contactList/AddContactItemCommand";
import { RemoveContactItemCommand } from "../commands/contactList/RemoveContactItemCommand";
import { SetContactListCommand } from "../commands/contactList/SetContactListCommand";
import { UpdateContactItemCommand } from "../commands/contactList/UpdateContactItemCommand";
import { ContactListEffect } from "../effects/ContactListEffect";
import { ContactItem } from "../entities/ContactItem";
import { ContactListStateContainer } from "./ContactListStateContainer";

const contact1 = new ContactItem("tester", "test", "testertest@gmail.com", "0569898766", "123");
const contact2 = new ContactItem("tester2", "test2", "testertest2@gmail.com", "0569398725", "456");
const contact3 = new ContactItem("tester3", "test3", "testertest3@gmail.com", "0569728714", "789");

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
        expect(stateContainer.getState().contacts[2]?.getName()).toBe("tester3");
    })

    it('should remove a contact into the list state', ()=>{
        stateContainer.dispatch(new RemoveContactItemCommand("456"));
        expect(stateContainer.getState().contacts.length).toBe(1);
        expect(stateContainer.getState().contacts[0]).toEqual(contact1);
    })

    it('should update a contact into the list state', ()=>{
        stateContainer.dispatch(new UpdateContactItemCommand(new ContactItem(contact2.getName(), contact2.getFirstname(), "newemail@gmail.com", contact2.getTel(), contact2.getId())));
        expect(stateContainer.getState().contacts[1].getEmail()).toBe("newemail@gmail.com");
    })
})