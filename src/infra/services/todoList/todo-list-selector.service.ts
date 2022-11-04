import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ITodoListState } from '../../../shared/abstract/ITodoListState';

import { StateSelector } from '../../../shared/abstract/StateSelector';
import { ITodoItem } from '../../models/ITodoItem';



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
