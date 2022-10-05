import { StateSelector } from "src/shared/abstract/StateSelector";



export interface StateSubject {
    attach(selector: StateSelector): void;
    detach(selector: StateSelector): void;
}