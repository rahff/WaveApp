
import { StateSelector } from "../../../shared/abstract/StateSelector";
import { Action } from "../../../shared/actions/Action";
import { CommandNotFoundException } from "../../exceptions/CommandNotFoundException";
import { Reducer } from "../../interfaces/Reducer";
import { BaseState } from "../../interfaces/states/BaseState";
import { EffectCreator } from "../../ports/driver/EffectCreator";






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