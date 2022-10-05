
import { StateContainer } from "src/core/containers/StateContainer";
import { Command } from "src/shared/command/Command";

export abstract class Dispatcher {

    constructor(protected stateContainer: StateContainer){}
    
    dispatch(command: Command): void {
        this.stateContainer.dispatch(command);
    }
}