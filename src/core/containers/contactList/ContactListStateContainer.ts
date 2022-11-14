import { StateSelector } from "../../../shared/abstract/StateSelector";
import { ContactListState } from "../../interfaces/states/ContactListState";
import { contactListStateMapper } from "../../mappers/states/ContactListMapper";
import { EffectCreator } from "../../ports/driver/EffectCreator";
import { ContactListStateReducer } from "../../reducers/ContactListStateReducer";
import { StateContainer } from "../stateContainer/StateContainer";




export class ContactListStateContainer extends StateContainer {

    protected override state: ContactListState = { contacts: [], onException: null, onSuccessSave: false};
    protected override reducer: ContactListStateReducer = new ContactListStateReducer();

    constructor(effect: EffectCreator, selector: StateSelector){
        super(effect, selector);
    }

    public override getState(): ContactListState {
        return this.state;
    }

    protected notify(): void {
        this.selector.update(contactListStateMapper(this.state));
    }
}