import { _Event } from "src/shared/actions/Action";


export class ExceptionEvent extends _Event {
    constructor(payload: string){
        super("onException", payload);
    }
}