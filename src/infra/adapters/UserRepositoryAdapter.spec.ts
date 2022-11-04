import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { user1 } from '../mocks/fake-data';
import { DatabaseModule } from '../modules/database.module';
import { UserRepositoryAdapter } from "./UserRepositoryAdapter";



describe("UserRepositoryAdapter", ()=> {

    let repository: UserRepositoryAdapter;
    let httpServiceSpy: any;
    beforeEach(()=> {
        httpServiceSpy = jasmine.createSpyObj('HttpService', ["post", "get"])
        TestBed.configureTestingModule({
            imports: [
                DatabaseModule,
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: HttpClient, useValue: httpServiceSpy
                }
            ]
        })
        repository = TestBed.inject(UserRepositoryAdapter);
    })

    it('should be created', ()=> {
        expect(repository).toBeTruthy();
    })
    
    it('should save user in localstorage', async()=>{
        await repository.saveUser(user1.asDto());
        const savedUser = localStorage.getItem('defaultUser');
        expect(JSON.parse(savedUser || "")).toEqual(user1.asDto());
    })
})