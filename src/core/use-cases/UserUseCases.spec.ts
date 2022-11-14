
import { UserFakeRepository } from "../../infra/mocks/UserFakeRepository";
import { IUser } from "../../infra/models/IUser";
import { UserUseCases } from "./UserUseCases";

const userWithInvalidEmail: IUser = {
    username: "Guillaume", 
    email: "guiguilamenace£$gmail.com",
    photo: "user.png",
    id: '123'
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
})