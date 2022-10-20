import { _Message } from "src/core/entities/_Message";
import { BaseState } from "./BaseState";

export interface MessageListState extends BaseState {
    inbox: _Message[];
    outbox: _Message[];
    messageSended: boolean;
}