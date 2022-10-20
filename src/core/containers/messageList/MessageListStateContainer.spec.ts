import { AddOutBoxMessageCommand } from "src/core/commands/messageList/AddOutBoxMessageCommand";
import { ContactItem } from "src/core/entities/ContactItem";
import { MessageSendedEvent } from "src/core/events/messages/MessageSendedEvent";
import { MessageListFakeRepository } from "src/infra/mocks/MessageListFakeRepository";
import { MessageListSelectorService } from "src/infra/services/messageList/message-list-selector.service";

import { AddMessageListCommand } from "../../commands/messageList/AddMessageListCommand";
import { RemoveMessageCommand } from "../../commands/messageList/RemoveMessageCommand";
import { SetMessageListCommand } from "../../commands/messageList/SetMessageListCommand";
import { MessageListEffect } from "../../effects/MessageListEffect";
import { _Message } from "../../entities/_Message";
import { MessageListState } from "../../interfaces/states/MessageListState";
import { MessageListStateContainer } from "./MessageListStateContainer";


const initialState: MessageListState = {inbox: [], outbox: [], onException: null, messageSended: false};
const contact = new ContactItem("test", "testester@gmail.com", "0450423036", "147852369");
const message1: _Message = new _Message(contact, "hello", "123id" ,null);
const message2: _Message = new _Message(contact, "hello2", "456id", null);
const message3: _Message = new _Message(contact, "salut", "789id", null);
const messageList: _Message[] = [message1, message2];


describe('MessageListStateContainer', ()=>{

    let stateContainer: MessageListStateContainer;
    let effectCreator: MessageListEffect;
    let stateSelector: MessageListSelectorService;

    beforeEach(()=>{
        stateSelector = new MessageListSelectorService()
        effectCreator = new MessageListEffect(new MessageListFakeRepository())
        stateContainer = new MessageListStateContainer(effectCreator, stateSelector);
        stateContainer.dispatch(new SetMessageListCommand(messageList));
    });

    it('should have initial state', ()=>{
        stateContainer.dispatch(new SetMessageListCommand(initialState.inbox));
        const state = stateContainer.getState();
        expect(state).toEqual(initialState);
    })

    it('should set inbox message list', ()=> {
        stateContainer.dispatch(new SetMessageListCommand(messageList));
        expect(stateContainer.getState().inbox).toEqual(messageList);
    });

    it('should remove a inbox message in the list', ()=> {
        stateContainer.dispatch(new RemoveMessageCommand(message1.getId()));
        expect(stateContainer.getState().inbox).toEqual([message2]);
    })

    it("should add several inbox message in the list", ()=> {
        stateContainer.dispatch(new AddMessageListCommand([message3, message1]));
        expect(stateContainer.getState().inbox).toEqual([...messageList, message3, message1]);
    })

    it('should add outbox message in the appropriate list', ()=>{
        stateContainer.dispatch(new AddOutBoxMessageCommand(message3));
        expect(stateContainer.getState().outbox).toEqual([message3]);
        expect(stateContainer.getState().messageSended).toBeTrue();
    })

    it('should reset sended message event to false', ()=>{
        stateContainer.dispatch(new AddOutBoxMessageCommand(message3));
        expect(stateContainer.getState().outbox).toEqual([message3]);
        stateContainer.dispatch(new MessageSendedEvent());
        expect(stateContainer.getState().messageSended).toBeFalse();
    })

})