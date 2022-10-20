import { StateSelector } from "src/shared/abstract/StateSelector";
import { Reducer } from "../../interfaces/Reducer";
import { MessageListState } from "../../interfaces/states/MessageListState";
import { messageListStateMapper } from "../../mappers/states/MessageListStateMapper";
import { EffectCreator } from "../../ports/driver/EffectCreator";
import { MessageListReducer } from "../../reducers/MessageListReducer";
import { StateContainer } from "../stateContainer/StateContainer";



export class MessageListStateContainer extends StateContainer {
    
    protected override state: MessageListState = {inbox: [], outbox: [], onException: null, messageSended: false};
    protected override reducer: MessageListReducer = new MessageListReducer();
    constructor(effectCreator: EffectCreator, selector: StateSelector){
        super(effectCreator, selector)
    }

    public override getState(): MessageListState {
        return this.state;
    }

    protected notify(): void {
        this.selector.update(messageListStateMapper(this.state));
    }
}