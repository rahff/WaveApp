import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { fakeMessage, newMessageList } from "../mocks/fake-data";
import { DatabaseModule } from "../modules/database.module";
import { MessageListRepositoryAdapter } from "./MessageListRepositoryAdapter";


describe('MessageListRepositoryAdapter', ()=> {
    let repository: MessageListRepositoryAdapter;
    let httpServiceSpy: any;
    beforeEach(()=>{
        httpServiceSpy = jasmine.createSpyObj('HttpClient', ["post", "get"])
        TestBed.configureTestingModule({
            imports: [DatabaseModule, HttpClientTestingModule],
            providers: [
                {
                    provide: HttpClient, useValue: httpServiceSpy
                }
            ]
        })
        repository = TestBed.inject(MessageListRepositoryAdapter);
    })

    it('should be created', ()=>{
        expect(repository).toBeTruthy();
    })

    it('should save new inbox messages', async()=> {
        const savedMessage = await repository.saveNewMessages(newMessageList);
        expect(savedMessage).toBe(newMessageList);
    });

    it('should send get request to new message endpoint', async ()=>{
        httpServiceSpy.get.and.returnValue(of(newMessageList));
        const result = await repository.getNewMessages("myemailaccount@gmail.com");
        expect(httpServiceSpy.get).toHaveBeenCalledWith(`http://localhost:8080/api/inbox-message?account=myemailaccount@gmail.com`);
    })

    it('should get local message list', async ()=> {
        const getMessage = async () => await repository.getMessageList();
        expect(getMessage).not.toThrowError();
    })

    it('should save outbox message', async()=> {
        httpServiceSpy.post.and.returnValue(of({...fakeMessage, id: "1233"}))
        const savedMessage = await repository.saveOutboxMessage({...fakeMessage, id: "1233"});
        expect(httpServiceSpy.post).toHaveBeenCalledWith(`http://localhost:8080/api/outbox-messages`, {...fakeMessage, id: savedMessage.id})
    })
})