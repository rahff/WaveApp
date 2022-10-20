import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { fakeAsync, flushMicrotasks, TestBed } from "@angular/core/testing";
import { fakeMessage, newMessageList } from "../mocks/fake-data";
import { DatabaseModule } from "../modules/database.module";
import { MessageListRepositoryAdapter } from "./MessageListRepositoryAdapter";


describe('MessageListRepositoryAdapter', ()=> {
    let repository: MessageListRepositoryAdapter;
    let http: HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [DatabaseModule, HttpClientTestingModule]
        })
        http = TestBed.inject(HttpTestingController);
        repository = TestBed.inject(MessageListRepositoryAdapter);
    })

    it('should be created', ()=>{
        expect(repository).toBeTruthy();
    })

    it('should return an empty array test', async ()=>{
        const result = await repository.getNewMessages();
        expect(result).toEqual([]);
    })

    it('should save new inbox messages', async()=> {
        const savedMessage = await repository.saveNewMessages(newMessageList);
        expect(savedMessage).toBe(newMessageList);
    });

    it('should get inbox list', async ()=> {
        const result = await repository.getMessageList();
        expect(result.length).toBeGreaterThan(0);
    })

    it('should save outbox message', async()=> {
        const savedMessage = await repository.saveOutboxMessage({...fakeMessage, id: ""})
        const req = http.expectOne("http://localhost:8080/api/outbox-messages");
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({...fakeMessage, id: savedMessage.id})
        req.flush({...fakeMessage, id: savedMessage})
    })
})