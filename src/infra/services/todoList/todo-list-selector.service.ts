import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TodoItem } from 'src/core/entities/TodoItem';
import { TodoListState } from 'src/core/interfaces/states/TodoListState';
import { StateSelector } from '../../../shared/abstract/StateSelector';



@Injectable({
  providedIn: 'root'
})
export class TodoListSelectorService extends StateSelector {

  protected override state$ = new BehaviorSubject<TodoListState>({onException: null, items: []});

  constructor() {
    super();
  }

  public getTodoList(): Observable<TodoItem[]> {
    return this.state$.asObservable()
    .pipe(map((state: TodoListState)=> state.items));
  }

}
