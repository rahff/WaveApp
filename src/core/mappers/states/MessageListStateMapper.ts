import { _Message } from "src/core/entities/_Message";
import { MessageListState } from "src/core/interfaces/states/MessageListState";
import { IMessageListState } from "src/shared/abstract/IMessageListState";


export const messageListStateMapper = (state: MessageListState): IMessageListState => {
    return {
        inbox: state.inbox.map((message: _Message) => message.asDto()),
        outbox: state.inbox.map((message: _Message) => message.asDto()),
        onException: state.onException,
        messageSended: state.messageSended
    }
}