import { ITodoItem } from "src/infra/models/ITodoItem";
import { IBaseState } from "./IBaseState";


export interface ITodoListState extends IBaseState {
    items: ITodoItem[];
    onSuccessSave: boolean
}