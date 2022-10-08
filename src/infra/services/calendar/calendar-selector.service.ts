import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CalendarEvent } from 'src/core/entities/CalendarEvent';
import { CalendarState } from 'src/core/interfaces/states/CalendarState';
import { StateSelector } from '../../../shared/abstract/StateSelector';



@Injectable({
  providedIn: 'root'
})
export class CalendarSelectorService extends StateSelector {

  protected override state$ = new BehaviorSubject<CalendarState>({onException: null, events: []});

  constructor() {
    super();
  }

  public getCalendarEvents(): Observable<CalendarEvent[]> {
    return this.state$.asObservable()
    .pipe(map((state: CalendarState) => state.events))
  }
}
