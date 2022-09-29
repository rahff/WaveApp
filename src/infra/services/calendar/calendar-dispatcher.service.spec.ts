import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { SetEventListCommand } from 'src/core/commands/calendar/SetEventListCommand';
import { CalendarStateContainer } from 'src/core/containers/CalendarStateContainer';
import { CalendarEffect } from 'src/core/effects/CalendarEffect';
import { ModifyCalendarEventCommand } from 'src/infra/commands/calendar/ModifyCalendarEventCommand';
import { fakeCalendarEvent1, fakeCalendarEvent2 } from 'src/infra/mocks/fake-data';
import { DeleteCalendarEventCommand } from '../../commands/calendar/DeleteCalendarEventCommand';
import { GetCalendarEventsCommand } from '../../commands/calendar/GetCalendarEventsCommand';
import { SaveCalendarEventCommand } from '../../commands/calendar/SaveCalendarEventCommand';
import { CalendarFakeRepository } from '../../mocks/CalendarFakeRepository';
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
    stateContainer.dispatch(new SetEventListCommand([fakeCalendarEvent1]))
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch getEvents command', fakeAsync(()=>{
    stateContainer.dispatch(new SetEventListCommand([]));
    service.dispatch(new GetCalendarEventsCommand());
    flushMicrotasks();
    expect(stateContainer.getState().events).toEqual([fakeCalendarEvent1, fakeCalendarEvent2]);
  }))

  it('should dispatch addEvent command', fakeAsync(()=>{
    service.dispatch(new SaveCalendarEventCommand(fakeCalendarEvent2));
    flushMicrotasks();
    expect(stateContainer.getState().events[1]).toEqual(fakeCalendarEvent2);
  }))

  it('should dispatch deleteCalendarEvent command', fakeAsync(()=>{
    service.dispatch(new DeleteCalendarEventCommand("123"));
    flushMicrotasks();
    expect(stateContainer.getState().events).toEqual([]);
  }));

  it('should dispatch modifyEvent command', fakeAsync(()=> {
    service.dispatch(new ModifyCalendarEventCommand({id: "123", eventDate: new Date(2022, 9, 22)}));
    flushMicrotasks(); 
    expect(stateContainer.getState().events[0].eventDate).toEqual(new Date(2022, 9, 22));
  }))
});
