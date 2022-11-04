
import { MessageListFakeRepository } from "../../infra/mocks/MessageListFakeRepository";
import { IMessage } from "../../infra/models/IMessage";
import { generateId } from "../../infra/utils/generators";
import { AddMessageListCommand } from "../commands/messageList/AddMessageListCommand";
import { AddOutBoxMessageCommand } from "../commands/messageList/AddOutBoxMessageCommand";
import { MessageListUseCases } from "./MessageListUseCases"


const outboxMessage: IMessage = {id: "", to: {email: "testemail@gmail.com", id: generateId(), name: "Francis B", tel: "0450424336"}, attachment: null, content: "hello world"}

describe('MessageListUseCases', ()=>{
    let useCases: MessageListUseCases;

    beforeEach(()=>{
        useCases = new MessageListUseCases(new MessageListFakeRepository());
    })

    it('should execute getNewMessage use case', async ()=>{
        const result = await useCases.applyGetNewMessage("");
        expect(result).toBeInstanceOf(AddMessageListCommand);
    })

    it('should execute saveOutboxMessage', async ()=>{
        const result = await useCases.applySaveOutboxMessage(outboxMessage);
        expect(result).toBeInstanceOf(AddOutBoxMessageCommand);
    })
})