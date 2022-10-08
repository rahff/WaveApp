import { Injectable } from '@angular/core';
import { TodoListStateContainer } from 'src/core/containers/TodoListStateContainer';
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
