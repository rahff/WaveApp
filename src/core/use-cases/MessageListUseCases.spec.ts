import { MessageListFakeRepository } from "src/infra/mocks/MessageListFakeRepository";
import { Action } from "src/shared/actions/Action";
import { MessageListUseCases } from "./MessageListUseCases"

describe('MessageListUseCases', ()=>{
    let useCases: MessageListUseCases;

    beforeEach(()=>{
        useCases = new MessageListUseCases(new MessageListFakeRepository());
    })

    it('should execute getNewMessage use case', async ()=>{
        const result = await useCases.applyGetNewMessage();
        expect(result).toBeInstanceOf(Action);
    })
})