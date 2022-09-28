import { Command } from "src/shared/command/Command";
import { BaseState } from "./states/BaseState";

export interface Reducer {
    reduceState(initialState: BaseState, command: Command): BaseState;
}