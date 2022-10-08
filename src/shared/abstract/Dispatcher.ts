
import { StateContainer } from "src/core/containers/StateContainer";
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