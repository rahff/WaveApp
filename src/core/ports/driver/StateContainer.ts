import { BaseState } from "src/core/interfaces/BaseState";
import { Command } from "src/shared/command/Command";


export interface StateContainer {
    dispatch(command: Command<any>): void;
    getState(): BaseState;
}