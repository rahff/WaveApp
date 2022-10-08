import { TestBed } from '@angular/core/testing';
import { DatabaseModule } from '../modules/database.module';
import { generateEmail } from '../utils/generators';
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
        const result = await repository.saveUser({id: "", username: "Eric", email: generatedEmail, password: "Mot2$asse"});
        expect(result.email).toEqual(generatedEmail);
    })

    it('should get the user', async ()=> {
        const generatedEmail = generateEmail()
        const savedUser = await repository.saveUser({id: "", username: "Eric", email: generatedEmail, password: "Mot2$asse"});
        const result = await repository.getUser(savedUser.id);
        expect(result.email).toBeDefined();
    })

    it('should get default user', async ()=> {
        const generatedEmail = generateEmail();
        await repository.saveUser({id: "", username: "User", email: generatedEmail, password: "Mot2$asse"});
        const defaultUser = await repository.getDefaultUser();
        expect(defaultUser).toBeTruthy();
    })
    
})