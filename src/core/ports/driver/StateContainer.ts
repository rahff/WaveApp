import { CommandNotFoundException } from "src/core/exceptions/CommandNotFoundException";
import { BaseState } from "src/core/interfaces/states/BaseState";
import { EffectCreator } from "src/core/interfaces/EffectCreator";
import { Reducer } from "src/core/interfaces/Reducer";
import { Command } from "src/shared/command/Command";


export class StateContainer {

    protected state: any;
    protected reducer!: Reducer;

    constructor(protected effect: EffectCreator){}

    public getState(): BaseState {
        return this.state;
    }

    public dispatch(command: Command): void {
        try {
            this.state = this.reducer.reduceState(this.state, command);
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
}