import { IMessage } from "src/infra/models/IMessage";
import { Action } from "src/shared/actions/Action";
import { AddMessageListCommand } from "../commands/messageList/AddMessageListCommand";
import { messageMapper } from "../mappers/entities/MessageMapper";
import { MessageListRepository } from "../ports/driven/MessageListRepository";



export class MessageListUseCases {

    constructor(private repository: MessageListRepository) {}

    public async applyGetNewMessage(): Promise<Action> {
        const newMessages = await this.repository.getNewMessage();
        const messageList = newMessages.map((message: IMessage)=> messageMapper(message))
        return new AddMessageListCommand(messageList);
    }
}