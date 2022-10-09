import { Command } from "src/shared/actions/Action";


export interface EffectCreator {
    createEffect(command: Command): Promise<Command>;
}