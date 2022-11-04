import { Injectable } from '@angular/core';
import { TodoListStateContainer } from '../../../core/containers/todoList/TodoListStateContainer';
import { Dispatcher } from '../../../shared/abstract/Dispatcher';
import { TodoListSelectorService } from './todo-list-selector.service';



@Injectable({
  providedIn: 'root'
})
export class TodoListDispatcherService extends Dispatcher<TodoListSelectorService> {

  constructor(stateContainer: TodoListStateContainer) {
    super(stateContainer);
  }
}
