import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { catchError, firstValueFrom } from "rxjs";
import { MessageListRepository } from "src/core/ports/driven/MessageListRepository";
import { environment } from "src/environments/environment";
import { IMessage } from "../models/IMessage";
import { DatabaseModule } from "../modules/database.module";
import { generateId } from "../utils/generators";



@Injectable({
    providedIn: DatabaseModule
})
export class MessageListRepositoryAdapter implements MessageListRepository {

    private baseApiUrl = environment.baseApiUrl;

    constructor(private service: NgxIndexedDBService,
                private http: HttpClient){}

    async saveOutboxMessage(message: IMessage): Promise<IMessage> {
        message.id = generateId();
        this.sendMessage(message);
        return await firstValueFrom(this.service.add("message", message)
        .pipe(catchError(()=> {throw new Error("failed to save !!")})));
    }

    private sendMessage(message: IMessage): void {
        firstValueFrom(this.http.post<IMessage>(`${this.baseApiUrl}/outbox-messages`, message)
        .pipe(catchError(()=> {throw new Error("failed on server")})));
    }

    async saveNewMessages(messages: IMessage[]): Promise<IMessage[]> {
        await firstValueFrom(this.service.bulkAdd("message", messages)
        .pipe(catchError(()=>{throw new Error("failed to save")})));
        return messages;
    }

    async getMessageList(): Promise<IMessage[]> {
        return await firstValueFrom(this.service.getAll<IMessage>("message")
        .pipe(catchError(()=> {throw  new Error('failed get all')})));
    }

    async getNewMessages(emailAccount: string): Promise<IMessage[]> {
        return await firstValueFrom(this.http.get<IMessage[]>(`${this.baseApiUrl}/inbox-message?account=${emailAccount}`)
        .pipe(catchError(()=> {throw new Error("failed to fetch inbox messages")})));
    }
}