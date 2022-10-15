import { TestBed } from '@angular/core/testing';
import { CalendarStateContainer } from 'src/core/containers/CalendarStateContainer';
import { CalendarEffect } from 'src/core/effects/CalendarEffect';
import { CalendarEvent } from 'src/core/entities/CalendarEvent';
import { CalendarFakeRepository } from 'src/infra/mocks/CalendarFakeRepository';
import { ICalendarEvent } from 'src/infra/models/ICalendarEvent';

import { CalendarSelectorService } from './calendar-selector.service';

describe('CalendarSelectorService', () => {
  let service: CalendarSelectorService;
  let stateContainer: CalendarStateContainer;
  beforeEach(() => {
    service = new CalendarSelectorService();
    stateContainer = new CalendarStateContainer(new CalendarEffect(new CalendarFakeRepository()), service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should observe state of container', ()=>{
    service.getCalendarEvents().subscribe((events: ICalendarEvent[])=>{
      expect(events).toEqual(stateContainer.getState().events.map((item)=> item.asDto()));
    })

    service.getOnSuccessSaveEvent().subscribe((onSuccess: boolean)=>{
      expect(onSuccess).toEqual(stateContainer.getState().onSuccessSave);
    })
  })
});
