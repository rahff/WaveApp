
import { MessageListStateContainer } from 'src/core/containers/messageList/MessageListStateContainer';
import { MessageListEffect } from 'src/core/effects/MessageListEffect';
import { MessageListFakeRepository } from 'src/infra/mocks/MessageListFakeRepository';
import { IMessage } from 'src/infra/models/IMessage';
import { MessageListSelectorService } from './message-list-selector.service';



describe('MessageListSelectorService', () => {
  let selector: MessageListSelectorService;
  let stateContainer: MessageListStateContainer;
  let effectCreator: MessageListEffect;
  beforeEach(() => {
    effectCreator = new MessageListEffect(new MessageListFakeRepository());
    stateContainer = new MessageListStateContainer(effectCreator, selector);
    selector = new MessageListSelectorService();
  });
  it('should be created', () => {
    expect(selector).toBeTruthy();
  });

  it('should observe state of stateContainer', ()=>{
    selector.getException().subscribe((exception: {message: string} | null)=>{
      expect(exception).toEqual(stateContainer.getState().onException)
    })
    selector.getMessageList().subscribe((list: IMessage[])=> {
      expect(list).toEqual(stateContainer.getState().messages.map((v)=> v.asDto()))
    })
  })
});
