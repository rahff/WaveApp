import { User } from "../entities/User";
import { SetUserCommand } from "../commands/UserCommand";
import { UserStateContainer } from "./UserStateContainer";
import { EffectCreator } from "../interfaces/EffectCreator";
import { UserEffect } from "../effects/UserEffect";
import { UserFakeRepository } from "src/infra/mocks/UserFakeRepository";
import { SetIsAuthCommand } from "../commands/SetIsAuthCommand";



describe('UserStateContainer', ()=> {
    let userStateContainer: UserStateContainer;
    let userEffect: EffectCreator
    beforeEach(()=>{
        userEffect = new UserEffect(new UserFakeRepository());
        userStateContainer = new UserStateContainer(userEffect);
    })

    it('should have a initial state as null user', ()=> {
       const state = userStateContainer.getState();
       expect(state.user).toBeNull();
    })

    it('should update user state', ()=> {
        userStateContainer.dispatch(new SetUserCommand(new User("francis", "Huiss", "francis@gmail.com")));
        const { user } = userStateContainer.getState();
        expect(user?.getName()).toBe("francis");
    })

    it('should set isAuth into the state', ()=>{
        userStateContainer.dispatch(new SetIsAuthCommand(true));
        const { isAuth } = userStateContainer.getState();
        expect(isAuth).toBeTrue();
    })
})