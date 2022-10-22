import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { user1 } from '../mocks/fake-data';
import { DatabaseModule } from '../modules/database.module';
import { generateEmail } from '../utils/generators';
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
    
    it("should send post requset to signup and save user in localStorage", async ()=> {
        localStorage.clear();
        httpServiceSpy.post.and.returnValue(of({...user1.asDto(), token: "jwtToken"}));
        const result = await repository.saveUser(user1.asDto());
        expect(httpServiceSpy.post).toHaveBeenCalledWith("http://localhost:8080/api/signup", user1.asDto());
        expect(result.email).toEqual(user1.asDto().email);
        expect(JSON.parse(localStorage.getItem('defaultUser') as string)).toEqual({...user1.asDto(), token: "jwtToken"});
    });

    it('should send post request to login endpoint with user credentials', async ()=> {
        localStorage.clear();
        httpServiceSpy.post.and.returnValue(of({...user1.asDto(), token: "jwtToken"}));
        const result = await repository.loginUser(user1.asDto().email, "Mot2$asse");
        expect(httpServiceSpy.post).toHaveBeenCalledWith("http://localhost:8080/api/login", {email: user1.asDto().email, password: "Mot2$asse"});
        expect(JSON.parse(localStorage.getItem('defaultUser') as string)).toEqual({...user1.asDto(), token: "jwtToken"});
    });

    it('should catch the error message', async ()=> {
        localStorage.clear();
        httpServiceSpy.post.and.throwError(new HttpErrorResponse({status: 401, error: "invalid credentials"}));
        try {
            const result = await repository.loginUser(user1.asDto().email, "WrongPa$$Word");
        } catch (error: any) {
            expect(error.error).toBe("invalid credentials");
            const localUser = localStorage.getItem('defaultUser')
            expect(localUser).toBeNull();
        }
    })
})