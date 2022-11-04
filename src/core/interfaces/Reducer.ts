
import { Action } from "../../shared/actions/Action";
import { BaseState } from "./states/BaseState";



export interface Reducer {
    reduceState(initialState: BaseState, command: Action): BaseState;
}