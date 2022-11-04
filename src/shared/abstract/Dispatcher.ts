
import { StateContainer } from "../../core/containers/stateContainer/StateContainer";
import { Command } from "../actions/Action";
import { StateSelector } from "./StateSelector";



export abstract class Dispatcher<T extends StateSelector> {

    public stateSelector: T
    constructor(protected stateContainer: StateContainer){
        this.stateSelector = this.stateContainer.getSelector() as T;
    }
    
    dispatch(command: Command): void {
        this.stateContainer.dispatch(command);
    }
}