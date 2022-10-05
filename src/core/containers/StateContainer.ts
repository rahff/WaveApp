import { CommandNotFoundException } from "src/core/exceptions/CommandNotFoundException";
import { BaseState } from "src/core/interfaces/states/BaseState";
import { EffectCreator } from "src/core/interfaces/EffectCreator";
import { Reducer } from "src/core/interfaces/Reducer";
import { Command } from "src/shared/command/Command";
import { StateSubject } from "../ports/driver/StateSubject";
import { StateSelector } from "src/shared/abstract/StateSelector";





export abstract class StateContainer implements StateSubject {

    protected state: BaseState = {onException: null};
    protected reducer!: Reducer;
    private selectors: StateSelector[] = [];

    constructor(protected effect: EffectCreator){}

    public attach(selector: StateSelector): void {
        if(!this.selectors.includes(selector)){
            this.selectors.push(selector);
        }
    }

    public detach(selector: StateSelector): void {
        this.selectors = this.selectors.filter((s) => s.id !== selector.id);
    }

    public getState(): BaseState {
        return this.state;
    }

    public dispatch(command: Command): void {
        try {
            this.state = this.reducer.reduceState(this.state, command);
            this.notify();
        } catch (error) {
            if(error instanceof CommandNotFoundException)
                this.reDispacth(command);
            else throw error;
        }
    }

    private async reDispacth(command: Command): Promise<void> {
        try {
            const _command = await this.effect.createEffect(command);
            this.dispatch(_command);
        } catch (error) {
            throw error;
        }
    }

    private notify(): void {
        this.selectors.forEach((selector: StateSelector) => selector.update());
    }

    public getSelectors(): StateSelector[] {
        return this.selectors;
    }
}