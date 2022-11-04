import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { SetEventListCommand } from '../../../core/commands/calendar/SetEventListCommand';
import { CalendarStateContainer } from '../../../core/containers/calendar/CalendarStateContainer';
import { CalendarEffect } from '../../../core/effects/CalendarEffect';
import { CalendarNotification } from '../../../core/valueObjects/CalendarNotification';
import { DeleteCalendarEventCommand } from '../../commands/calendar/DeleteCalendarEventCommand';
import { GetCalendarEventsCommand } from '../../commands/calendar/GetCalendarEventsCommand';
import { ModifyCalendarEventCommand } from '../../commands/calendar/ModifyCalendarEventCommand';
import { SaveCalendarEventCommand } from '../../commands/calendar/SaveCalendarEventCommand';
import { CalendarFakeRepository } from '../../mocks/CalendarFakeRepository';
import { fakeCalendarEvent1, fakeCalendarEvent2, fakeCalendarEvent3 } from '../../mocks/fake-data';
import { CalendarDispatcherService } from './calendar-dispatcher.service';
import { CalendarSelectorService } from './calendar-selector.service';



describe('CalendarDispatcherService', () => {
  let service: CalendarDispatcherService;
  let stateContainer: CalendarStateContainer;
  const effectCreator = new CalendarEffect(new CalendarFakeRepository());
  const stateSelector = new CalendarSelectorService()
  beforeEach(() => {
    stateContainer = new CalendarStateContainer(effectCreator, stateSelector);
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

  it('should dispatch saveEvent command', fakeAsync(()=>{
    fakeCalendarEvent3.setNotification({notificationTime: "1:00", notificationDateTime: null, eventStart: fakeCalendarEvent3.asDto().start, eventTitle: fakeCalendarEvent3.asDto().title})
    service.dispatch(new SaveCalendarEventCommand(fakeCalendarEvent3.asDto()));
    flushMicrotasks();
    expect(stateContainer.getState().events[1]).toEqual(fakeCalendarEvent3);
    flushMicrotasks();
    expect(stateContainer.getState().events[1].getNotification()).toEqual(new CalendarNotification("1:00", fakeCalendarEvent3.getStart(), fakeCalendarEvent3.asDto().title));
  }));


  it('should dispatch saveEvent command', fakeAsync(()=>{
    service.dispatch(new SaveCalendarEventCommand(fakeCalendarEvent3.asDto()));
    flushMicrotasks();
    expect(stateContainer.getState().events[1]).toEqual(fakeCalendarEvent3);
  }));

  it('should dispatch deleteCalendarEvent command', fakeAsync(()=>{
    service.dispatch(new DeleteCalendarEventCommand("123"));
    flushMicrotasks();
    expect(stateContainer.getState().events).toEqual([]);
  }));

  it('should dispatch modifyEvent command', fakeAsync(()=> {
    service.dispatch(new ModifyCalendarEventCommand({...fakeCalendarEvent1.asDto(), start: new Date(2018, 8, 22, 6, 0)}));
    flushMicrotasks(); 
    expect(stateContainer.getState().events[0].getStart()).toEqual( new Date(2018, 8, 22, 6, 0));
  }))
});
