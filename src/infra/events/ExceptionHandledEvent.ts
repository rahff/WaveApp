import { _Event } from "../../shared/actions/Action";



export class ExceptionHandledEvent extends _Event {
    constructor(){
        super("exceptionHandled", null);
    }
}