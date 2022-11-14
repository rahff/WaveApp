
import { ContactItem } from "../../entities/ContactItem";
import { BaseState } from "./BaseState";

export interface ContactListState extends BaseState{
    contacts: ContactItem[];
    onSuccessSave: boolean;
}