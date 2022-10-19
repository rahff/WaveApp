import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { catchError, firstValueFrom } from "rxjs";
import { MessageListRepository } from "src/core/ports/driven/MessageListRepository";
import { newMessageList } from "../mocks/fake-data";
import { IMessage } from "../models/IMessage";
import { DatabaseModule } from "../modules/database.module";



@Injectable({
    providedIn: DatabaseModule
})
export class MessageListRepositoryAdapter implements MessageListRepository {

    constructor(private service: NgxIndexedDBService){}

    async saveNewMessages(messages: IMessage[]): Promise<IMessage[]> {
        await firstValueFrom(this.service.bulkAdd("message", messages)
        .pipe(catchError(()=>{throw new Error("failed to save")})));
        return messages;
    }

    async getMessageList(): Promise<IMessage[]> {
        return await firstValueFrom(this.service.getAll<IMessage>("message")
        .pipe(catchError(()=> {throw  new Error('failed get all')})));
    }

    async getNewMessages(): Promise<IMessage[]> {
        return [];
    }

}