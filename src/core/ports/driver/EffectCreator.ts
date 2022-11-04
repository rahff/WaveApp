import { Action, Command } from "../../../shared/actions/Action";



export interface EffectCreator {
    createEffect(command: Command): Promise<Action>;
}