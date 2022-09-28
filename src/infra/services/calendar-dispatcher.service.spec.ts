

import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { SetEventListCommand } from 'src/core/commands/calendar/SetEventListCommand';
import { CalendarStateContainer } from 'src/core/containers/CalendarStateContainer';
import { CalendarEffect } from 'src/core/effects/CalendarEffect';
import { CalendarEvent } from 'src/core/entities/CalendarEvent';
import { DeleteCalendarEventCommand } from '../commands/calendar/DeleteCalendarEventCommand';
import { GetCalendarEventsCommand } from '../commands/calendar/GetCalendarEventsCommand';
import { SaveCalendarEventCommand } from '../commands/calendar/SaveCalendarEventCommand';
import { CalendarFakeRepository } from '../mocks/CalendarFakeRepository';
import { CalendarDispatcherService } from './calendar-dispatcher.service';

describe('CalendarDispatcherService', () => {
  let service: CalendarDispatcherService;
  let stateContainer: CalendarStateContainer;
  const effectCreator = new CalendarEffect(new CalendarFakeRepository());

  beforeEach(() => {
    stateContainer = new CalendarStateContainer(effectCreator)
    service = new CalendarDispatcherService(stateContainer);
  });

  beforeEach(()=>{
    stateContainer.dispatch(new SetEventListCommand([new CalendarEvent("123", new Date(), {hour: 4, minute: 0}, "test")]))
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch getEvents command', fakeAsync(()=>{
    stateContainer.dispatch(new SetEventListCommand([]));
    service.dispatch(new GetCalendarEventsCommand());
    flushMicrotasks();
    expect(stateContainer.getState().events).toEqual([new CalendarEvent("123",new Date(2022, 8, 22), {hour: 5, minute: 0}, "test1"), new CalendarEvent("456", new Date(), {hour: 8, minute: 0}, "test2")])
  }))

  it('should dispatch addEvent command', fakeAsync(()=>{
    service.dispatch(new SaveCalendarEventCommand(new CalendarEvent("123", new Date(2018, 8, 22), {hour: 6, minute: 0}, "saved")));
    flushMicrotasks();
    expect(stateContainer.getState().events[1]).toEqual(new CalendarEvent("123", new Date(2018, 8, 22), {hour: 6, minute: 0}, "saved"));
  }))

  it('should dispatch deleteCalendarEvent command', fakeAsync(()=>{
    service.dispatch(new DeleteCalendarEventCommand("123"));
    flushMicrotasks();
    expect(stateContainer.getState().events).toEqual([]);
  }))
});
