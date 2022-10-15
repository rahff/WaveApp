import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ITodoItem } from 'src/infra/models/ITodoItem';
import { ITodoListState } from 'src/shared/abstract/ITodoListState';
import { StateSelector } from '../../../shared/abstract/StateSelector';



@Injectable({
  providedIn: 'root'
})
export class TodoListSelectorService extends StateSelector {

  protected override state$ = new BehaviorSubject<ITodoListState>({onException: null, items: [], onSuccessSave: false});

  constructor() {
    super();
  }

  public getTodoList(): Observable<ITodoItem[]> {
    return this.state$.asObservable()
    .pipe(map((state: ITodoListState)=> state.items));
  }

  public getSuccessSaveEvent(): Observable<boolean> {
    return this.state$.asObservable()
    .pipe(map((state: ITodoListState)=> state.onSuccessSave));
  }

}
