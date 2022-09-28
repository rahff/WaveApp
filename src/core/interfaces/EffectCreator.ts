import { Command } from "src/shared/command/Command";

export interface EffectCreator {
    createEffect(command: Command): Promise<Command>;
}