import { Injectable } from '@angular/core';
import { TodoListStateContainer } from 'src/core/containers/TodoListStateContainer';
import { Command } from 'src/shared/command/Command';
import { Dispatcher } from '../../interfaces/Dispatcher';



@Injectable({
  providedIn: 'root'
})
export class TodoListDispatcherService extends Dispatcher {

  constructor(stateContainer: TodoListStateContainer) {
    super(stateContainer);
  }
}
