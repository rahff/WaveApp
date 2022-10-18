import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IMessage } from "src/infra/models/IMessage";
import { MessageListModule } from "src/infra/modules/message-list.module";
import { Facade } from "src/shared/abstract/Facade";
import { MessageListDispatcherService } from "./message-list-dispatcher.service";
import { MessageListSelectorService } from "./message-list-selector.service";



@Injectable({
    providedIn: MessageListModule
})
export class MessageListFacade extends Facade<MessageListSelectorService> {

    constructor(dispatcher: MessageListDispatcherService){
        super(dispatcher)
    }

    public getMessageList(): Observable<IMessage[]> {
        return this.dispatcher.stateSelector.getMessageList();
    }

}