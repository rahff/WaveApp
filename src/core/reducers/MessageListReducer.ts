
import { Action } from "../../shared/actions/Action";
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
                    inbox: command.getPayload()
                }
            case "removeMessage":
                return {
                    ...initialState,
                    inbox: this.removeMessage(initialState.inbox, command.getPayload())
                }
    
            case "addMessageList":
                return {
                    ...initialState,
                    inbox: [...initialState.inbox, ...command.getPayload()]
                }

            case "onException": 
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                }

            case "addOutBoxMessage": 
                return {
                    ...initialState,
                    outbox: [...initialState.outbox, command.getPayload()],
                    messageSended: true
                }

            case "messageSended": 
                return {
                    ...initialState,
                    messageSended: false
                }

            default: throw new CommandNotFoundException();
        
        };
    }

    private removeMessage(list: _Message[], removedId: string): _Message[] {
        return list.filter((message: _Message) => message.getId() !== removedId);
    }

}