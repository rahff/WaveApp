
import { CalendarStateContainer } from '../../../core/containers/calendar/CalendarStateContainer';
import { CalendarEffect } from '../../../core/effects/CalendarEffect';
import { CalendarFakeRepository } from '../../mocks/CalendarFakeRepository';
import { ICalendarEvent } from '../../models/ICalendarEvent';
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
