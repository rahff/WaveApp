import { _Event } from "src/shared/actions/Action";


export class ErrorEvent extends _Event {
    constructor(payload: string){
        super("onError", payload);
    }
}