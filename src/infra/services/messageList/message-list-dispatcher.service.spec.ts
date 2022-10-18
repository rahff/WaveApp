import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { MessageListStateContainer } from 'src/core/containers/messageList/MessageListStateContainer';
import { MessageListEffect } from 'src/core/effects/MessageListEffect';
import { messageMapper } from 'src/core/mappers/entities/MessageMapper';
import { GetNewMessagesCommand } from 'src/infra/commands/messageList/GetNewMessagesCommand';
import { newMessageList } from 'src/infra/mocks/fake-data';
import { MessageListFakeRepository } from 'src/infra/mocks/MessageListFakeRepository';
import { MessageListDispatcherService } from './message-list-dispatcher.service';
import { MessageListSelectorService } from './message-list-selector.service';



describe('MessageListDispatcherService', () => {
  let service: MessageListDispatcherService;
  let stateContainer: MessageListStateContainer;
  let effectCreator: MessageListEffect;
  let selector: MessageListSelectorService;
  beforeEach(() => {
    selector = new MessageListSelectorService()
    effectCreator = new MessageListEffect(new MessageListFakeRepository());
    stateContainer = new MessageListStateContainer(effectCreator, selector)
    service =  new MessageListDispatcherService(stateContainer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch getNewMessagesCommand', fakeAsync(()=>{
    service.dispatch(new GetNewMessagesCommand());
    flushMicrotasks();
    expect(stateContainer.getState().messages).toEqual(newMessageList.map((v)=> messageMapper(v)))
  }))
});
