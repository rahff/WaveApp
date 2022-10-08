import { EffectCreator } from "../ports/driver/EffectCreator";
import { ContactListState } from "../interfaces/states/ ContactListState";
import { StateContainer } from "./StateContainer"
import { ContactListStateReducer } from "../reducers/ContactListStateReducer";
import { StateSelector } from "src/shared/abstract/StateSelector";
import { contactListStateMapper } from "../mappers/states/ContactListMapper";



export class ContactListStateContainer extends StateContainer {

    protected override state: ContactListState = { contacts: [], onException: null };
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