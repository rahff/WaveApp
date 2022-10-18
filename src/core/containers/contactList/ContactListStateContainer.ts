import { ContactListState } from "src/core/interfaces/states/ ContactListState";
import { contactListStateMapper } from "src/core/mappers/states/ContactListMapper";
import { EffectCreator } from "src/core/ports/driver/EffectCreator";
import { ContactListStateReducer } from "src/core/reducers/ContactListStateReducer";
import { StateSelector } from "src/shared/abstract/StateSelector";
import { StateContainer } from "../stateContainer/StateContainer";




export class ContactListStateContainer extends StateContainer {

    protected override state: ContactListState = { contacts: [], onException: null, onSuccessSave: false };
    protected override reducer: ContactListStateReducer = new ContactListStateReducer();

    constructor(effect: EffectCreator, selector: StateSelector){
        super(effect, selector);
        this.notify();
    }

    public override getState(): ContactListState {
        return this.state;
    }

    protected notify(): void {
        this.selector.update(contactListStateMapper(this.state));
    }
}