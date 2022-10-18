import { Injectable } from "@angular/core";
import { MessageListRepository } from "src/core/ports/driven/MessageListRepository";
import { IMessage } from "../models/IMessage";
import { DatabaseModule } from "../modules/database.module";
import { newMessageList } from "./fake-data";


@Injectable({
    providedIn: DatabaseModule
})
export class MessageListFakeRepository implements MessageListRepository {

    async getNewMessage(): Promise<IMessage[]> {
        return newMessageList;
    }

}