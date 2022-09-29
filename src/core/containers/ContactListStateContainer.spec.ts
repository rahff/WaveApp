import { ContactListFakeRepository } from "src/infra/mocks/ContactListFakeRepository";
import { AddContactItemCommand } from "../commands/contactList/AddContactItemCommand";
import { RemoveContactItemCommand } from "../commands/contactList/RemoveContactItemCommand";
import { SetContactListCommand } from "../commands/contactList/SetContactListCommand";
import { UpdateContactItemCommand } from "../commands/contactList/UpdateContactItemCommand";
import { ContactListEffect } from "../effects/ContactListEffect";
import { ContactItem } from "../entities/ContactItem";
import { ContactListStateContainer } from "./ContactListStateContainer";

const contact1: ContactItem = { id: "123", name: "tester", firstname: "test", email: "testertest@gmail.com", tel: "05698987"};
const contact2: ContactItem = { id: "456", name: "tester2", firstname: "test2", email: "testertest2@gmail.com", tel: "05618987"};
const contact3: ContactItem = { id: "789", name: "tester3", firstname: "test3", email: "testertest3@gmail.com", tel: "05918982"};

describe('ContactListStateContainer', ()=> {

    let stateContainer: ContactListStateContainer;

    beforeEach(()=>{
        stateContainer = new ContactListStateContainer(new ContactListEffect(new ContactListFakeRepository()));
        stateContainer.dispatch(new SetContactListCommand([contact1, contact2]));
    })

    it('should set contactList into the state', ()=> {
        stateContainer.dispatch(new SetContactListCommand([contact1]));
        expect(stateContainer.getState().contacts).toEqual([contact1]);
    })

    it('should add a contact item into state list', ()=>{
        stateContainer.dispatch(new AddContactItemCommand(contact3));
        expect(stateContainer.getState().contacts[2]?.name).toBe("tester3");
    })

    it('should remove a contact into the list state', ()=>{
        stateContainer.dispatch(new RemoveContactItemCommand("456"));
        expect(stateContainer.getState().contacts.length).toBe(1);
        expect(stateContainer.getState().contacts[0]).toEqual(contact1);
    })

    it('should update a contact into the list state', ()=>{
        stateContainer.dispatch(new UpdateContactItemCommand({...contact2, email: "newemail@gmail.com"}));
        expect(stateContainer.getState().contacts[1].email).toBe("newemail@gmail.com");
    })
})