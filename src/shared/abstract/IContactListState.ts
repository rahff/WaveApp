import { IContactItem } from "src/infra/models/IContactIem";
import { IBaseState } from "./IBaseState";



export interface IContactListState extends IBaseState {
    contacts: IContactItem[]
}