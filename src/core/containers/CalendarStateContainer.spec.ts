import { CalendarFakeRepository } from "src/infra/mocks/CalendarFakeRepository";
import { AddCalendarEventCommand } from "../commands/calendar/AddCalendarEventCommand";
import { RemoveCalendarEventCommand } from "../commands/calendar/RemoveCalendarEventCommand";
import { SetEventListCommand } from "../commands/calendar/SetEventListCommand";
import { CalendarEffect } from "../effects/CalendarEffect";
import { CalendarEvent } from "../entities/CalendarEvent";
import { CalendarStateContainer } from "./CalendarStateContainer";

describe("CalendarStateContainer", ()=> {
    let stateContainer: CalendarStateContainer;
    const effectCreator: CalendarEffect = new CalendarEffect(new CalendarFakeRepository())
    beforeEach(()=> {
        stateContainer = new CalendarStateContainer(effectCreator);
    })

    beforeEach(()=>{
        stateContainer.dispatch(new SetEventListCommand([new CalendarEvent("123", new Date(2018, 8, 22), {hour: 4, minute: 0}, "test")]));
    })

    it('should set events list into state', ()=>{
        stateContainer.dispatch(new SetEventListCommand([new CalendarEvent("123", new Date(2018, 8, 22), {hour: 4, minute: 0}, "test")]));
        expect(stateContainer.getState().events).toEqual([new CalendarEvent("123", new Date(2018, 8, 22), {hour: 4, minute: 0}, "test")])
    })

    it('should add an event into state list', ()=>{
        stateContainer.dispatch(new AddCalendarEventCommand(new CalendarEvent("123", new Date(2018, 8, 22), {hour: 8, minute: 0}, "added")));
        expect(stateContainer.getState().events[1]).toEqual(new CalendarEvent("123", new Date(2018, 8, 22), {hour: 8, minute: 0}, "added"));
    })

    it('should remove an event into the state list', ()=>{
        stateContainer.dispatch(new RemoveCalendarEventCommand("123"));
        expect(stateContainer.getState().events).toEqual([]);
    })
})