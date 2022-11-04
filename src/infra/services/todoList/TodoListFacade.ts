import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Facade } from "../../../shared/abstract/Facade";
import { ITodoItem } from "../../models/ITodoItem";
import { TodoModule } from "../../modules/todo.module";
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