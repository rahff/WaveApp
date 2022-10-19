import { IMessage } from "src/infra/models/IMessage";

export interface MessageListRepository {
    getNewMessages(emailAccount: string): Promise<IMessage[]>;
    getMessageList(): Promise<IMessage[]>;
    saveNewMessages(messages: IMessage[]): Promise<IMessage[]>;
}