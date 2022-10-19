import { MessageListRepository } from "src/core/ports/driven/MessageListRepository";
import { IMessage } from "../models/IMessage";
import { newMessageList, savedMessages } from "./fake-data";



export class MessageListFakeRepository implements MessageListRepository {

    async saveNewMessages(messages: IMessage[]): Promise<IMessage[]> {
        return messages;
    }

    async getMessageList(): Promise<IMessage[]> {
        return savedMessages;
    }

    async getNewMessages(): Promise<IMessage[]> {
        return newMessageList;
    }

}