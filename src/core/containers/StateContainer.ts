import { CommandNotFoundException } from "src/core/exceptions/CommandNotFoundException";
import { BaseState } from "src/core/interfaces/states/BaseState";
import { Reducer } from "src/core/interfaces/Reducer";
import { StateSelector } from "src/shared/abstract/StateSelector";
import { EffectCreator } from "../ports/driver/EffectCreator";
import { Action } from "src/shared/actions/Action";





export abstract class StateContainer {

    protected state: BaseState = {onException: null};
    protected reducer!: Reducer;

    constructor(protected effect: EffectCreator, protected selector: StateSelector){}

    public getState(): BaseState {
        return this.state;
    }

    public dispatch(action: Action): void {
        try {
            this.state = this.reducer.reduceState(this.state, action);
            this.notify();
        } catch (error) {
            if(error instanceof CommandNotFoundException)
                this.reDispacth(action);
            else throw error;
        }
    }

    private async reDispacth(command: Action): Promise<void> {
        try {
            const _command = await this.effect.createEffect(command);
            this.dispatch(_command);
        } catch (error) {
            throw error;
        }
    }

    protected abstract notify(): void

    public getSelector(): StateSelector {
        return this.selector;
    }
}