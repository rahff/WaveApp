import { TestBed } from '@angular/core/testing';
import { DatabaseModule } from '../modules/database.module';
import { generateEmail } from '../utils/generateId';
import { UserRepositoryAdapter } from "./UserRepositoryAdapter";



describe("UserRepositoryAdapter", ()=> {

    let repository: UserRepositoryAdapter;

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [
                DatabaseModule
            ],
        })
        repository = TestBed.inject(UserRepositoryAdapter);
    })

    it('should be created', ()=> {
        expect(repository).toBeTruthy();
    })
    
    it("should save a user", async ()=> {
        const generatedEmail = generateEmail();
        const result = await repository.saveUser({id: "", name: "Teflon", firstname: "Eric", email: generatedEmail, password: "123123"});
        expect(result.email).toEqual(generatedEmail);
    })

    it('should get the user', async ()=> {
        const generatedEmail = generateEmail()
        const {id} = await repository.saveUser({id: "", name: "Richter", firstname: "Eric", email: generatedEmail, password: "123123"});
        const result = await repository.getUser(id);
        expect(result.email).toBeDefined();
    })

    it('should get default user', async ()=> {
        const generatedEmail = generateEmail();
        await repository.saveUser({id: "", name: "Default", firstname: "User", email: generatedEmail, password: "123123"});
        const defaultUser = await repository.getDefaultUser();
        expect(defaultUser).toBeTruthy();
    })
    
})