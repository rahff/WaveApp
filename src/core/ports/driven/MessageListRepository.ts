import { IMessage } from "../../../infra/models/IMessage";


export interface MessageListRepository {
    getNewMessages(emailAccount: string): Promise<IMessage[]>;
    getMessageList(): Promise<IMessage[]>;
    saveNewMessages(messages: IMessage[]): Promise<IMessage[]>;
    saveOutboxMessage(message: IMessage): Promise<IMessage>;
}