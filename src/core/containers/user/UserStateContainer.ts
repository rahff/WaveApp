
import { StateSelector } from "../../../shared/abstract/StateSelector";
import { UserState } from "../../interfaces/states/UserState";
import { userStateMapper } from "../../mappers/states/UserStateMapper";
import { EffectCreator } from "../../ports/driver/EffectCreator";
import { UserStateReducer } from "../../reducers/UserStateReducer";
import { StateContainer } from "../stateContainer/StateContainer";



export class UserStateContainer extends StateContainer{

    protected override state: UserState = { user: null, onException: null, signupEvent: null, photoSavedEvent: false};
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