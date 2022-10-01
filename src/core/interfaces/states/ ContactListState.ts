import { ContactItem } from "src/core/entities/ContactItem";
import { BaseState } from "./BaseState";

export interface ContactListState extends BaseState{
    contacts: ContactItem[];
}