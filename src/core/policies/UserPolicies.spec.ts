import { UserFakeRepository } from "src/infra/mocks/UserFakeRepository";
import { UserPolicies } from "./UserPolicies";

const userWithInvalidEmail = {
    id: "",
    username: "Guillaume", 
    email: "guiguilamenace£$gmail.com",
    password: "Mot2$asse"
}

const userWithWeakPassword = {
    id: "",
    username: "Guillaume", 
    email: "guiguilamenace@gmail.com",
    password: "Motdepasse"
}

describe("UserPolicies", ()=>{
    let policies: UserPolicies;

    beforeEach(()=>{
        policies = new UserPolicies(new UserFakeRepository());
    })

    it('should verify that email is correct', async ()=> {
        const commandResult = await policies.applySaveUserPolicies(userWithInvalidEmail);
        expect(commandResult.getPayload()).toEqual("invalid email...")
    });

    it('should verify that password is strong', async ()=> {
        const commandResult = await policies.applySaveUserPolicies(userWithWeakPassword);
        expect(commandResult.getPayload()).toEqual("password must include at least 8 character and 1 special character 1 number and one uppercase")
    });
})