import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICalendarEvent } from 'src/infra/models/ICalendarEvent';
import { ICalendarState } from 'src/shared/abstract/ICalendarState';
import { StateSelector } from '../../../shared/abstract/StateSelector';



@Injectable({
  providedIn: 'root'
})
export class CalendarSelectorService extends StateSelector {

  protected override state$ = new BehaviorSubject<ICalendarState>({onException: null, events: []});

  constructor() {
    super();
  }

  public getCalendarEvents(): Observable<ICalendarEvent[]> {
    return this.state$.asObservable()
    .pipe(map((state: ICalendarState) => state.events))
  }
}
