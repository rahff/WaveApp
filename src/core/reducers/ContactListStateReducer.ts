
import { Action } from "../../shared/actions/Action";
import { ContactItem } from "../entities/ContactItem";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { Reducer } from "../interfaces/Reducer";
import { ContactListState } from "../interfaces/states/ContactListState";



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
                    contacts: [...initialState.contacts, command.getPayload()],
                    onSuccessSave: true
                };

            case "removeContact":
                return {
                    ...initialState,
                    contacts: this.removeContact(initialState.contacts, command.getPayload())
                };
                
            case "onException": 
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                }
                
            case "exceptionHandled": 
                return {
                    ...initialState,
                    onException: command.getPayload()
                }

            case "contactSaved":
                return {
                    ...initialState,
                    onSuccessSave: false
                }

            default: throw new CommandNotFoundException();
        }
    }

    private removeContact(list: ContactItem[], contactId: string): ContactItem[] {
        return list.filter((contact: ContactItem) => contact.getId() !== contactId);
    }
}