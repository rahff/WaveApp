import { Action } from "src/shared/actions/Action";
import { _Message } from "../entities/_Message";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { Reducer } from "../interfaces/Reducer";
import { MessageListState } from "../interfaces/states/MessageListState";


export class MessageListReducer implements Reducer {


    reduceState(initialState: MessageListState, command: Action): MessageListState {
        switch (command.getName()) {
            case "setMessages":
                return {
                    ...initialState,
                    messages: command.getPayload()
                }
            case "removeMessage":
                return {
                    ...initialState,
                    messages: this.removeMessage(initialState.messages, command.getPayload())
                }
            case "addMessage":
                return {
                    ...initialState,
                    messages: [...initialState.messages, command.getPayload()]
                }

            case "addMessageList":
                return {
                    ...initialState,
                    messages: [...initialState.messages, ...command.getPayload()]
                }
            default: throw new CommandNotFoundException();
        
        };
    }

    private removeMessage(list: _Message[], removedId: string): _Message[] {
        return list.filter((message: _Message) => message.getId() !== removedId);
    }

}