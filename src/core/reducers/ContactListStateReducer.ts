import { Action } from "src/shared/actions/Action";
import { ContactItem } from "../entities/ContactItem";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { Reducer } from "../interfaces/Reducer";
import { ContactListState } from "../interfaces/states/ ContactListState";



export class ContactListStateReducer implements Reducer {

    reduceState(initialState: ContactListState, command: Action): ContactListState {
        switch (command.getName()) {
            case "setContacts":
                return {
                    ...initialState,
                    contacts: command.getPayload()
                };

            case "addContact":
                return {
                    ...initialState,
                    contacts: [...initialState.contacts, command.getPayload()]
                };

            case "removeContact":
                return {
                    ...initialState,
                    contacts: this.removeContact(initialState.contacts, command.getPayload())
                };

            case "updateContact":
                return {
                    ...initialState,
                    contacts: this.updateContact(initialState.contacts, command.getPayload())
                };
                
            case "onError": 
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                }
                
            case "exceptionThrowed": 
                return {
                    ...initialState,
                    onException: command.getPayload()
                }

            default: throw new CommandNotFoundException();
        }
    }

    private updateContact(list: ContactItem[], updated: ContactItem): ContactItem[] {
        return list.map((contact: ContactItem) => {
            if(contact.getId() === updated.getId()) contact = updated;
            return contact;
        })
    }

    private removeContact(list: ContactItem[], contactId: string): ContactItem[] {
        return list.filter((contact: ContactItem) => contact.getId() !== contactId);
    }
}