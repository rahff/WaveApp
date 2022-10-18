import { IMessage } from "src/infra/models/IMessage";
import { IBaseState } from "./IBaseState";

export interface IMessageListState extends IBaseState {
    messages: IMessage[]
}