import { _Event } from "src/shared/actions/Action";


export class ExceptionHandledEvent extends _Event {
    constructor(){
        super("exceptionHandled", null);
    }
}