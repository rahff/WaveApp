import { EffectCreator } from "../interfaces/EffectCreator";
import { UserState } from "../interfaces/states/UserState";
import { StateContainer } from "./StateContainer";
import { UserStateReducer } from "../reducers/UserStateReducer";



export class UserStateContainer extends StateContainer{

    protected override state: UserState = { user: null, isAuth: false, onWrongPassword: false, onException: null, isNewUser: null};
    protected override reducer: UserStateReducer = new UserStateReducer();

    constructor(effect: EffectCreator){
        super(effect);
    }

    public override getState(): UserState {
        return this.state;
    }
}