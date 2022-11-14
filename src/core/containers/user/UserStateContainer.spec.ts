
import { UserFakeRepository } from "../../../infra/mocks/UserFakeRepository";
import { UserSelectorService } from "../../../infra/services/user/user-selector.service";
import { SetUserCommand } from "../../commands/user/UserCommand";
import { UserEffect } from "../../effects/UserEffect";
import { User } from "../../entities/User";
import { SetPhotoSavedEvent } from "../../events/user/SetPhotoSavedEvent";
import { SignupEvent } from "../../events/user/SignupEvent";
import { EffectCreator } from "../../ports/driver/EffectCreator";
import { UserStateContainer } from "./UserStateContainer";

const user1: User = new User("francis", "francis@gmail.com", "123");

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

    it('should set SignupEvent', ()=> {
        userStateContainer.dispatch(new SignupEvent(true));
        expect(userStateContainer.getState().signupEvent).toBeTrue()
    })

    it('should set photoSaved to true', ()=>{
        userStateContainer.dispatch(new SetPhotoSavedEvent(true));
        expect(userStateContainer.getState().photoSavedEvent).toBeTrue()
    })

    it('should reset photoSaved event', ()=>{
        userStateContainer.dispatch(new SetPhotoSavedEvent(false));
        expect(userStateContainer.getState().photoSavedEvent).toBeFalse()
    })
})