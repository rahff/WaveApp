import { IMessage } from "src/infra/models/IMessage";

export interface MessageListRepository {
    getNewMessage(): Promise<IMessage[]>
}