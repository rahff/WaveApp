import { User } from "../entities/User";
import { SetUserCommand } from "../commands/UserCommand";
import { UserStateReducer } from "../reducers/UserStateReducer";
import { UserStateContainer } from "./UserStateContainer";



describe('UserStateContainer', ()=> {
    let userStateContainer: UserStateContainer;

    beforeEach(()=>{
        userStateContainer = new UserStateContainer(new UserStateReducer());
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
})