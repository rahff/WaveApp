import { IMessageListState } from "../../../shared/abstract/IMessageListState"
import { _Message } from "../../entities/_Message"
import { MessageListState } from "../../interfaces/states/MessageListState"



export const messageListStateMapper = (state: MessageListState): IMessageListState => {
    return {
        inbox: state.inbox.map((message: _Message) => message.asDto()),
        outbox: state.inbox.map((message: _Message) => message.asDto()),
        onException: state.onException,
        messageSended: state.messageSended
    }
}