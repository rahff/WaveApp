import { Injectable } from '@angular/core';
import { MessageListStateContainer } from '../../../core/containers/messageList/MessageListStateContainer';
import { Dispatcher } from '../../../shared/abstract/Dispatcher';
import { MessageListSelectorService } from './message-list-selector.service';



@Injectable({
  providedIn: 'root'
})
export class MessageListDispatcherService extends Dispatcher<MessageListSelectorService> {

  constructor(stateContainer: MessageListStateContainer) {
    super(stateContainer);
  }
}
