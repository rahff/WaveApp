import { Injectable } from '@angular/core';
import { CalendarStateContainer } from 'src/core/containers/CalendarStateContainer';
import { Dispatcher } from '../../../shared/abstract/Dispatcher';




@Injectable({
  providedIn: 'root'
})
export class CalendarDispatcherService extends Dispatcher{

  constructor(stateContainer: CalendarStateContainer) {
    super(stateContainer);
  }
}
