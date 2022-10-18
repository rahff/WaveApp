import { _Message } from "src/core/entities/_Message";
import { BaseState } from "./BaseState";

export interface MessageListState extends BaseState {
    messages: _Message[]
}