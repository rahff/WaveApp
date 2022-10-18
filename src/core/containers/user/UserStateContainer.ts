import { UserState } from "src/core/interfaces/states/UserState";
import { userStateMapper } from "src/core/mappers/states/UserStateMapper";
import { EffectCreator } from "src/core/ports/driver/EffectCreator";
import { UserStateReducer } from "src/core/reducers/UserStateReducer";
import { StateSelector } from "src/shared/abstract/StateSelector";
import { StateContainer } from "../stateContainer/StateContainer";



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