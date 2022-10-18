import { UserFakeRepository } from "src/infra/mocks/UserFakeRepository";
import { UserUseCases } from "./UserUseCases";

const userWithInvalidEmail = {
    id: "",
    username: "Guillaume", 
    email: "guiguilamenace£$gmail.com",
    password: "Mot2$asse",
    isAuth: false
}

const userWithWeakPassword = {
    id: "",
    username: "Guillaume", 
    email: "guiguilamenace@gmail.com",
    password: "Motdepasse",
    isAuth: false
}

describe("UserUseCases", ()=>{
    let useCases: UserUseCases;

    beforeEach(()=>{
        useCases = new UserUseCases(new UserFakeRepository());
    })

    it('should verify that email is correct', async ()=> {
        const commandResult = await useCases.applySaveUser(userWithInvalidEmail);
        expect(commandResult.getPayload()).toEqual("invalid email...")
    });

    it('should verify that password is strong', async ()=> {
        const commandResult = await useCases.applySaveUser(userWithWeakPassword);
        expect(commandResult.getPayload()).toEqual("password must include at least 8 character and 1 special character 1 number and one uppercase")
    });
})