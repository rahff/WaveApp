import { ContactItem } from "src/core/entities/ContactItem";
import { MessageListFakeRepository } from "src/infra/mocks/MessageListFakeRepository";
import { MessageListSelectorService } from "src/infra/services/messageList/message-list-selector.service";

import { AddMessageListCommand } from "../../commands/messageList/AddMessageListCommand";
import { RemoveMessageCommand } from "../../commands/messageList/RemoveMessageCommand";
import { SetMessageListCommand } from "../../commands/messageList/SetMessageListCommand";
import { MessageListEffect } from "../../effects/MessageListEffect";
import { _Message } from "../../entities/_Message";
import { MessageListState } from "../../interfaces/states/MessageListState";
import { MessageListStateContainer } from "./MessageListStateContainer";


const initialState: MessageListState = {messages: [], onException: null};
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
        stateContainer.dispatch(new SetMessageListCommand(initialState.messages));
        const state = stateContainer.getState();
        expect(state).toEqual(initialState);
    })

    it('should set message list', ()=> {
        stateContainer.dispatch(new SetMessageListCommand(messageList));
        expect(stateContainer.getState().messages).toEqual(messageList);
    });

    it('should remove a message in the list', ()=> {
        stateContainer.dispatch(new RemoveMessageCommand(message1.getId()));
        expect(stateContainer.getState().messages).toEqual([message2]);
    })

    it("should add several massage in the list", ()=> {
        stateContainer.dispatch(new AddMessageListCommand([message3, message1]));
        expect(stateContainer.getState().messages).toEqual([...messageList, message3, message1]);
    })

})