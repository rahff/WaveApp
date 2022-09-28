import { StateContainer } from "src/core/ports/driver/StateContainer";
import { Command } from "src/shared/command/Command";

export class Dispatcher {

    constructor(protected stateContainer: StateContainer){}
    
    dispatch(command: Command): void {
        this.stateContainer.dispatch(command);
    }
}