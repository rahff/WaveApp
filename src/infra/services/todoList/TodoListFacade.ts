import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ITodoItem } from "src/infra/models/ITodoItem";
import { TodoModule } from "src/infra/modules/todo.module";
import { Facade } from "src/shared/abstract/Facade";
import { TodoListDispatcherService } from "./todo-list-dispatcher.service";
import { TodoListSelectorService } from "./todo-list-selector.service";



@Injectable({
    providedIn: TodoModule
})
export class TodoListFacade extends Facade<TodoListSelectorService> {

    constructor(dispatcher: TodoListDispatcherService){
        super(dispatcher)
    }

    public getTodoList(): Observable<ITodoItem[]> {
        return this.dispatcher.stateSelector.getTodoList();
    }

    public getSuccessSaveEvent(): Observable<boolean> {
        return this.dispatcher.stateSelector.getSuccessSaveEvent();
    }
}