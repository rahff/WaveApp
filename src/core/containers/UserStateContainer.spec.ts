import { User } from "../entities/User";
import { SetUserCommand } from "../commands/user/UserCommand";
import { UserStateContainer } from "./UserStateContainer";
import { EffectCreator } from "../interfaces/EffectCreator";
import { UserEffect } from "../effects/UserEffect";
import { UserFakeRepository } from "src/infra/mocks/UserFakeRepository";
import { SetIsAuthCommand } from "../commands/user/SetIsAuthCommand";

const user1: User = {name: "Huiss", firstname: "francis", email: "francis@gmail.com"};

describe('UserStateContainer', ()=> {

    let userStateContainer: UserStateContainer;
    let userEffect: EffectCreator;

    beforeEach(()=>{
        userEffect = new UserEffect(new UserFakeRepository());
        userStateContainer = new UserStateContainer(userEffect);
    })

    it('should have a initial state as null user', ()=> {
       const state = userStateContainer.getState();
       expect(state.user).toBeNull();
    })

    it('should update user state', ()=> {
        userStateContainer.dispatch(new SetUserCommand(user1));
        const { user } = userStateContainer.getState();
        expect(user?.firstname).toBe("francis");
    })

    it('should set isAuth into the state', ()=>{
        userStateContainer.dispatch(new SetIsAuthCommand(true));
        const { isAuth } = userStateContainer.getState();
        expect(isAuth).toBeTrue();
    })
})