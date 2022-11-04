import { EffectCreator } from "../../ports/driver/EffectCreator";
import { TodoListState } from "../../interfaces/states/TodoListState";
import { StateContainer } from "../stateContainer/StateContainer";
import { TodoListStateReducer } from "../../reducers/TodoListStateReducer";;
import { todoListStateMapper } from "../../mappers/states/TodoListStateMapper";
import { StateSelector } from "../../../shared/abstract/StateSelector";



export class TodoListStateContainer extends StateContainer {

    protected override state: TodoListState = { items: [], onException: null, onSuccessSave: false };
    protected override reducer: TodoListStateReducer = new TodoListStateReducer();
    
    constructor(effect: EffectCreator, selector: StateSelector){
        super(effect, selector);
        this.notify();
    }

    public override getState(): TodoListState {
        return this.state;
    }

    protected notify(): void {
        this.selector.update(todoListStateMapper(this.state));
    }
}