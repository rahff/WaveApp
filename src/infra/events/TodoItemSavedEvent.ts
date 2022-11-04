import { _Event } from "../../shared/actions/Action";


export class TodoItemSavedEvent extends _Event {
    constructor(){
        super("todoItemSaved", null)
    }
}