import { IContactListState } from "src/shared/abstract/IContactListState";
import { ContactItem } from "../../entities/ContactItem";
import { ContactListState } from "../../interfaces/states/ ContactListState";
;

export const contactListStateMapper = (state: ContactListState): IContactListState => {
    return {
        contacts: state.contacts.map((item: ContactItem) => item.asDto()),
        onException: state.onException
    }
}