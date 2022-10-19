import { TestBed } from "@angular/core/testing";
import { fakeMessage, newMessageList } from "../mocks/fake-data";
import { DatabaseModule } from "../modules/database.module";
import { MessageListRepositoryAdapter } from "./MessageListRepositoryAdapter";


describe('MessageListRepositoryAdapter', ()=> {
    let repository: MessageListRepositoryAdapter;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [DatabaseModule]
        })
        repository = TestBed.inject(MessageListRepositoryAdapter);
    })

    it('should be created', ()=>{
        expect(repository).toBeTruthy();
    })

    it('should return an empty array', async ()=>{
        const result = await repository.getNewMessages();
        expect(result).toEqual([]);
    })

    it('should save new messages', async()=> {
        const savedMessage = await repository.saveNewMessages(newMessageList);
        expect(savedMessage).toBe(newMessageList);
    });

    it('should get message list', async ()=> {
        const result = await repository.getMessageList();
        expect(result.length).toBeTruthy();
    })
})