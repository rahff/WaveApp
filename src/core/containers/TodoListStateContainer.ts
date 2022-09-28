import { EffectCreator } from "../interfaces/EffectCreator";
import { TodoListState } from "../interfaces/states/TodoListState";
import { StateContainer } from "../ports/driver/StateContainer";
import { TodoListStateReducer } from "../reducers/TodoListStateReducer";



export class TodoListStateContainer extends StateContainer {

    protected override state: TodoListState = { items: [] };
    protected override reducer: TodoListStateReducer = new TodoListStateReducer();
    
    constructor(effect: EffectCreator){
        super(effect)
    }

    public override getState(): TodoListState {
        return this.state;
    }
}