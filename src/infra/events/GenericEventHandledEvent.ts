import { _Event } from "../../shared/actions/Action";


export class GenericEventHandledEvent extends _Event {
    constructor(){
        super('genericEventHandled', false);
    }
}