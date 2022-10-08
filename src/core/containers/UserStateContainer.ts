import { EffectCreator } from "../ports/driver/EffectCreator";
import { UserState } from "../interfaces/states/UserState";
import { StateContainer } from "./StateContainer";
import { UserStateReducer } from "../reducers/UserStateReducer";
import { StateSelector } from "src/shared/abstract/StateSelector";
import { userStateMapper } from "../mappers/states/UserStateMapper";



export class UserStateContainer extends StateContainer{

    protected override state: UserState = { user: null, isAuth: false, onException: null, signupEvent: null};
    protected override reducer: UserStateReducer = new UserStateReducer();

    constructor(effect: EffectCreator, selector: StateSelector){
        super(effect, selector);
        this.notify()
    }

    public override getState(): UserState {
        return this.state;
    }

    protected notify(): void {
        this.selector.update(userStateMapper(this.state));
    }
}