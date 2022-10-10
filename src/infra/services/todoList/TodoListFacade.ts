import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TodoItem } from "src/core/entities/TodoItem";
import { ITodoItem } from "src/infra/models/ITodoItem";
import { Facade } from "src/shared/abstract/Facade";
import { TodoListDispatcherService } from "./todo-list-dispatcher.service";
import { TodoListSelectorService } from "./todo-list-selector.service";



@Injectable({
    providedIn: "root"
})
export class TodoListFacade extends Facade<TodoListSelectorService> {

    constructor(dispatcher: TodoListDispatcherService){
        super(dispatcher)
    }

    public getTodoList(): Observable<ITodoItem[]> {
        return this.dispatcher.stateSelector.getTodoList();
    }
}