import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { user1 } from '../mocks/fake-data';
import { DatabaseModule } from '../modules/database.module';
import { ElectronModule } from '../modules/electron.module';
import { UserRepositoryAdapter } from "./UserRepositoryAdapter";



describe("UserRepositoryAdapter", ()=> {

    let repository: UserRepositoryAdapter;
    let fileSystemBridgeSpy: any;
    beforeEach(()=> {
        fileSystemBridgeSpy = jasmine.createSpyObj('FileSystemBridgeSpy', ["dispatch"]);
        TestBed.configureTestingModule({
            imports: [
                DatabaseModule,
                HttpClientTestingModule,
                ElectronModule
            ],
            providers: [
                {
                    provide: "FileSystemBridge", useValue: fileSystemBridgeSpy
                }
            ]
        })
        repository = TestBed.inject(UserRepositoryAdapter);
    })

    it('should be created', ()=> {
        expect(repository).toBeTruthy();
    })
    
    it('should save user in localstorage', async()=>{
        fileSystemBridgeSpy.dispatch.and.returnValue(new Promise((resolve)=> resolve(true)));
        await repository.saveUser(user1.asDto());
        const savedUser = localStorage.getItem('defaultUser');
        const savedUserAsObject = JSON.parse(savedUser || "");
        expect(savedUserAsObject).toEqual({...user1.asDto(), id: savedUserAsObject.id});
    })
})