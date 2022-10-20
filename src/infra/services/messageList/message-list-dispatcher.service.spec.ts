import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { SetMessageListCommand } from 'src/core/commands/messageList/SetMessageListCommand';
import { MessageListStateContainer } from 'src/core/containers/messageList/MessageListStateContainer';
import { MessageListEffect } from 'src/core/effects/MessageListEffect';
import { _Message } from 'src/core/entities/_Message';
import { messageMapper } from 'src/core/mappers/entities/MessageMapper';
import { GetMessageListCommand } from 'src/infra/commands/messageList/GetMessageListCommand';
import { GetNewMessagesCommand } from 'src/infra/commands/messageList/GetNewMessagesCommand';
import { SaveOutBoxMessageCommand } from 'src/infra/commands/messageList/SaveOutBoxMessageCommand';
import { fakeMessage4, newMessageList, savedMessages } from 'src/infra/mocks/fake-data';
import { MessageListFakeRepository } from 'src/infra/mocks/MessageListFakeRepository';
import { IMessage } from 'src/infra/models/IMessage';
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
    stateContainer.dispatch(new SetMessageListCommand([]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch getNewMessagesCommand', fakeAsync(()=>{
    service.dispatch(new GetMessageListCommand());
    flushMicrotasks();
    expect(stateContainer.getState().inbox).toEqual([...mapList(savedMessages)])
    service.dispatch(new GetNewMessagesCommand("myEmail@gmail.com"));
    flushMicrotasks();
    expect(stateContainer.getState().inbox).toEqual([...mapList(savedMessages), ...mapList(newMessageList)]);
  }));

  it('should dispatch saveOutboxMessage command', fakeAsync(()=>{
    service.dispatch(new SaveOutBoxMessageCommand(fakeMessage4));
    flushMicrotasks();
    expect(stateContainer.getState().outbox).toEqual([messageMapper(fakeMessage4)]);
  }))

  const mapList = (list: IMessage[]): _Message[] => {
    return list.map((item: IMessage) => messageMapper(item))
  }
});
