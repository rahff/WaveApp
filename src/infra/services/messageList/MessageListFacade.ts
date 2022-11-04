import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Facade } from "../../../shared/abstract/Facade";
import { IMessage } from "../../models/IMessage";
import { MessageListModule } from "../../modules/message-list.module";

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

    public getMessageSendedEvent(): Observable<boolean> {
        return this.dispatcher.stateSelector.getSendedMessageEvent();
    }

}