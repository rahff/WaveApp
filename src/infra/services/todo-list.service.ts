import { Injectable } from '@angular/core';
import { TodoListStateContainer } from 'src/core/containers/TodoListStateContainer';
import { Command } from 'src/shared/command/Command';



@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private stateContainer: TodoListStateContainer) { }

  public dispatch(command: Command<any>): void {
    this.stateContainer.dispatch(command);
  }
}
