import { EffectCreator } from "../interfaces/EffectCreator";
import { ContactListState } from "../interfaces/states/ ContactListState";
import { StateContainer } from "../ports/driver/StateContainer"
import { ContactListStateReducer } from "../reducers/ContactListStateReducer";



export class ContactListStateContainer extends StateContainer {

    protected override state: ContactListState = { contacts: [], onException: null };
    protected override reducer: ContactListStateReducer = new ContactListStateReducer();

    constructor(effect: EffectCreator){
        super(effect);
    }

    public override getState(): ContactListState {
        return this.state;
    }
}