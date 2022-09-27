import { TodoItem } from "src/core/entities/TodoItem";
import { Command } from "src/shared/command/Command";



export class SetTodoListItemsCommand extends Command<TodoItem[]> {

    constructor(payload: TodoItem[]){
        super("setItems", payload);
    }
}

export class AddTodoListItemCommand extends Command<TodoItem> {
    constructor(payload: TodoItem){
        super("addItem", payload);
    }
}

export class RemoveTodoListItemCommand extends Command<string> {
    constructor(payload: string){
        super("removeItem", payload);
    }
}

export class DoneTodoListItemCommand extends Command<string> {
    constructor(payload: string){
        super("doneItem", payload);
    }
}

export class UpdateDescriptionItemCommand extends Command<{id: string, update: string}> {
    constructor(payload: {id: string, update: string}){
        super("updateDescriptionItem", payload);
    }
}
