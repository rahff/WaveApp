import { Injectable } from '@angular/core';
import { CalendarStateContainer } from '../../../core/containers/calendar/CalendarStateContainer';
import { Dispatcher } from '../../../shared/abstract/Dispatcher';
import { CalendarSelectorService } from './calendar-selector.service';



@Injectable({
  providedIn: 'root'
})
export class CalendarDispatcherService extends Dispatcher<CalendarSelectorService> {

  constructor(stateContainer: CalendarStateContainer) {
    super(stateContainer);
  }
}
