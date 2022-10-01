import { Command } from "src/shared/command/Command";
import { ContactItem } from "../entities/ContactItem";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { Reducer } from "../interfaces/Reducer";
import { ContactListState } from "../interfaces/states/ ContactListState";



export class ContactListStateReducer implements Reducer {

    reduceState(initialState: ContactListState, command: Command): ContactListState {
        switch (command.getName()) {
            case "setContacts":
                return {
                    ...initialState,
                    contacts: command.getPayload()
                }
            case "addContact":
                return {
                    ...initialState,
                    contacts: [...initialState.contacts, command.getPayload()]
                }
            case "removeContact":
                return {
                    ...initialState,
                    contacts: this.removeContact(initialState.contacts, command.getPayload())
                }
            case "updateContact":
                return {
                    ...initialState,
                    contacts: this.updateContact(initialState.contacts, command.getPayload())
                }
            case "itemAlreadyExist":
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                }
            case "itemNotExist":
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                }
            case "canNotModify":
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                }

            default: throw new CommandNotFoundException();
        }
    }

    private updateContact(list: ContactItem[], updated: ContactItem): ContactItem[] {
        return list.map((contact: ContactItem) => {
            if(contact.id === updated.id) contact = updated;
            return contact;
        })
    }

    private removeContact(list: ContactItem[], contactId: string): ContactItem[] {
        return list.filter((contact: ContactItem) => contact.id !== contactId);
    }
}