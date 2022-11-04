import { _Event } from "../../../shared/actions/Action";


export class ExceptionEvent extends _Event {
    constructor(payload: string){
        super("onException", payload);
    }
}