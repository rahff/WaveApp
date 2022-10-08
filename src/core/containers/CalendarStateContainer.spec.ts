import { CalendarFakeRepository } from "src/infra/mocks/CalendarFakeRepository";
import { CalendarSelectorService } from "src/infra/services/calendar/calendar-selector.service";
import { AddCalendarEventCommand } from "../commands/calendar/AddCalendarEventCommand";
import { RemoveCalendarEventCommand } from "../commands/calendar/RemoveCalendarEventCommand";
import { SetEventListCommand } from "../commands/calendar/SetEventListCommand";
import { UpdateCalendarEventCommand } from "../commands/calendar/UpdateCalendarEventCommand";
import { CalendarEffect } from "../effects/CalendarEffect";
import { CalendarEvent } from "../entities/CalendarEvent";
import { CalendarStateContainer } from "./CalendarStateContainer";

const fakeCalendarEvent1: CalendarEvent = new CalendarEvent("test", new Date(2019, 8, 22, 4, 0), new Date(2019, 8, 22, 6, 0), '123');
const fakeCalendarEvent2: CalendarEvent = new CalendarEvent("added", new Date(2019, 8, 22, 7, 0), new Date(2019, 8, 22, 9, 0), '456');


describe("CalendarStateContainer", ()=> {

    let stateContainer: CalendarStateContainer;
    const effectCreator: CalendarEffect = new CalendarEffect(new CalendarFakeRepository());
    let stateSelector: CalendarSelectorService
    beforeEach(()=> {
        stateSelector = new CalendarSelectorService()
        stateContainer = new CalendarStateContainer(effectCreator, stateSelector);
    });

    beforeEach(()=>{
        stateContainer.dispatch(new SetEventListCommand([fakeCalendarEvent1]));
    });

    it('should set events list into state', ()=>{
        stateContainer.dispatch(new SetEventListCommand([fakeCalendarEvent1]));
        expect(stateContainer.getState().events).toEqual([fakeCalendarEvent1])
    });

    it('should add an event into state list', ()=>{
        stateContainer.dispatch(new AddCalendarEventCommand(fakeCalendarEvent2));
        expect(stateContainer.getState().events[1]).toEqual(fakeCalendarEvent2);
    });

    it('should remove an event into the state list', ()=>{
        stateContainer.dispatch(new RemoveCalendarEventCommand("123"));
        expect(stateContainer.getState().events).toEqual([]);
    });

    it('should update an event into the state list', ()=>{
        const updated = new CalendarEvent(fakeCalendarEvent1.getTitle(), new Date(2018, 9, 22, 11, 0), fakeCalendarEvent1.getEnd(), fakeCalendarEvent1.getId());
        stateContainer.dispatch(new UpdateCalendarEventCommand(updated));
        expect(stateContainer.getState().events[0].getStart()).toEqual(new Date(2018, 9, 22, 11, 0));
    });
})