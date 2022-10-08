import { _Event } from "src/shared/actions/Action";


export class ExceptionThrowedEvent extends _Event {
    constructor(){
        super("exceptionThrowed", null);
    }
}