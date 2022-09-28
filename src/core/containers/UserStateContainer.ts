import { EffectCreator } from "../interfaces/EffectCreator";
import { UserState } from "../interfaces/states/UserState";
import { StateContainer } from "../ports/driver/StateContainer";
import { UserStateReducer } from "../reducers/UserStateReducer";



export class UserStateContainer extends StateContainer{

    protected override state: UserState = { user: null, isAuth: false };
    protected override reducer: UserStateReducer = new UserStateReducer();

    constructor(effect: EffectCreator){
        super(effect);
    }

    public override getState(): UserState {
        return this.state;
    }
}