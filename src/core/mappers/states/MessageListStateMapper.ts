import { _Message } from "src/core/entities/_Message";
import { MessageListState } from "src/core/interfaces/states/MessageListState";
import { IMessageListState } from "src/shared/abstract/IMessageListState";


export const messageListStateMapper = (state: MessageListState): IMessageListState => {
    return {
        messages: state.messages.map((message: _Message) => message.asDto()),
        onException: state.onException
    }
}