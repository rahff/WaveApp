
import { _Message } from "../../entities/_Message";
import { BaseState } from "./BaseState";



export interface MessageListState extends BaseState {
    inbox: _Message[];
    outbox: _Message[];
    messageSended: boolean;
}