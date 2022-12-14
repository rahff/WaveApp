
import { IMessage } from "../../infra/models/IMessage";
import { Action } from "../../shared/actions/Action";
import { AddMessageListCommand } from "../commands/messageList/AddMessageListCommand";
import { AddOutBoxMessageCommand } from "../commands/messageList/AddOutBoxMessageCommand";
import { SetMessageListCommand } from "../commands/messageList/SetMessageListCommand";
import { ExceptionEvent } from "../events/shared/ExceptionEvent";
import { messageMapper } from "../mappers/entities/MessageMapper";
import { MessageListRepository } from "../ports/driven/MessageListRepository";



export class MessageListUseCases {

    constructor(private repository: MessageListRepository) {}

    public async applyGetNewMessage(emailAccount: string): Promise<Action> {
        try {
            let newMessages = await this.repository.getNewMessages(emailAccount);
            newMessages = await this.repository.saveNewMessages(newMessages);
            const messageList = newMessages.map((message: IMessage)=> messageMapper(message))
            return new AddMessageListCommand(messageList);
        } catch (error: any) {
            return new ExceptionEvent(error.message);
        }
    }

    public async applyGetMessageList(): Promise<Action> {
        try {
            const messageList = await this.repository.getMessageList();
            const messageEntityList = messageList.map((message: IMessage)=> messageMapper(message));
            return new SetMessageListCommand(messageEntityList);
        } catch (error: any) {
            return new ExceptionEvent(error.message);
        }
    }

    public async applySaveOutboxMessage(message: IMessage): Promise<Action> {
        try {
            const savedMessage = await this.repository.saveOutboxMessage(message);
            return new AddOutBoxMessageCommand(messageMapper(savedMessage));
        } catch (error: any) {
            return new ExceptionEvent(error.message);
        }
    }
}