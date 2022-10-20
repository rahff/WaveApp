import { IMessage } from "src/infra/models/IMessage";
import { IBaseState } from "./IBaseState";

export interface IMessageListState extends IBaseState {
    inbox: IMessage[];
    outbox: IMessage[];
    messageSended: boolean;
}