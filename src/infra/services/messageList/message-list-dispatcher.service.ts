import { Injectable } from '@angular/core';
import { MessageListStateContainer } from 'src/core/containers/messageList/MessageListStateContainer';
import { Dispatcher } from 'src/shared/abstract/Dispatcher';
import { MessageListSelectorService } from './message-list-selector.service';



@Injectable({
  providedIn: 'root'
})
export class MessageListDispatcherService extends Dispatcher<MessageListSelectorService> {

  constructor(stateContainer: MessageListStateContainer) {
    super(stateContainer);
  }
}
