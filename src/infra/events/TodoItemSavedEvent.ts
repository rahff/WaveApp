import { _Event } from "src/shared/actions/Action";

export class TodoItemSavedEvent extends _Event {
    constructor(){
        super("todoItemSaved", null)
    }
}