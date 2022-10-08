import { User } from "../entities/User";
import { SetUserCommand } from "../commands/user/UserCommand";
import { UserStateContainer } from "./UserStateContainer";
import { EffectCreator } from "../interfaces/EffectCreator";
import { UserEffect } from "../effects/UserEffect";
import { UserFakeRepository } from "src/infra/mocks/UserFakeRepository";
import { SetIsAuthCommand } from "../commands/user/SetIsAuthCommand";
import { IsNewUserEvent } from "../events/user/IsNewUserEvent";
import { UserSelectorService } from "src/infra/services/user/user-selector.service";

const user1: User = new User("francis", "francis@gmail.com", "Mot2$asse", "8488");

describe('UserStateContainer', ()=> {

    let userStateContainer: UserStateContainer;
    let userEffect: EffectCreator;
    let selector: UserSelectorService
    beforeEach(()=>{
        selector = new UserSelectorService();
        userEffect = new UserEffect(new UserFakeRepository());
        userStateContainer = new UserStateContainer(userEffect, selector);
    })

    it('should have a initial state as null user', ()=> {
       const state = userStateContainer.getState();
       expect(state.user).toBeNull();
    })

    it('should update user state', ()=> {
        userStateContainer.dispatch(new SetUserCommand(user1));
        const { user } = userStateContainer.getState();
        expect(user?.getUsername()).toBe("francis");
    })

    it('should set isAuth into the state', ()=>{
        userStateContainer.dispatch(new SetIsAuthCommand(true));
        const { isAuth } = userStateContainer.getState();
        expect(isAuth).toBeTrue();
    })

    it('should set isNewUserEvent', ()=> {
        userStateContainer.dispatch(new IsNewUserEvent(true));
        expect(userStateContainer.getState().isNewUser).toBeTrue()
    })
})