import { EffectCreator } from "../interfaces/EffectCreator";
import { TodoListState } from "../interfaces/states/TodoListState";
import { StateContainer } from "./StateContainer";
import { TodoListStateReducer } from "../reducers/TodoListStateReducer";
import { StateSelector } from "src/shared/abstract/StateSelector";
import { todoListStateMapper } from "../mappers/states/TodoListStateMapper";



export class TodoListStateContainer extends StateContainer {

    protected override state: TodoListState = { items: [], onException: null };
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