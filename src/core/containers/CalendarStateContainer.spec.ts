import { CalendarFakeRepository } from "src/infra/mocks/CalendarFakeRepository";
import { AddCalendarEventCommand } from "../commands/calendar/AddCalendarEventCommand";
import { RemoveCalendarEventCommand } from "../commands/calendar/RemoveCalendarEventCommand";
import { SetEventListCommand } from "../commands/calendar/SetEventListCommand";
import { UpdateCalendarEventCommand } from "../commands/calendar/UpdateCalendarEventCommand";
import { CalendarEffect } from "../effects/CalendarEffect";
import { CalendarEvent } from "../entities/CalendarEvent";
import { CalendarStateContainer } from "./CalendarStateContainer";

const fakeCalendarEvent1: CalendarEvent = {id: "123", start: new Date(2018, 8, 22, 4, 0), end: new Date(2018, 8, 22, 6, 0), title: "test"}
const fakeCalendarEvent2: CalendarEvent = {id: "456", start: new Date(2018, 8, 22, 7, 0), end: new Date(2018, 8, 22, 9, 0), title: "added"}

describe("CalendarStateContainer", ()=> {

    let stateContainer: CalendarStateContainer;
    const effectCreator: CalendarEffect = new CalendarEffect(new CalendarFakeRepository());

    beforeEach(()=> {
        stateContainer = new CalendarStateContainer(effectCreator);
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
        stateContainer.dispatch(new UpdateCalendarEventCommand({...fakeCalendarEvent1, start: new Date(2018, 9, 22, 11, 0)}));
        expect(stateContainer.getState().events[0].start).toEqual(new Date(2018, 9, 22, 11, 0));
    });
})