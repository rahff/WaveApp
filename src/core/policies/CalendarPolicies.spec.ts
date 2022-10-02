import { CalendarFakeRepository } from "src/infra/mocks/CalendarFakeRepository";
import { AddCalendarEventCommand } from "../commands/calendar/AddCalendarEventCommand";
import { CalendarEvent } from "../entities/CalendarEvent";
import { CalendarPolicies } from "./CalendarPolicies"


const dateProvider = ()=> new Date(2022, 9, 1, 2, 38);
const eventStartInPast: CalendarEvent = {
    id: "458",
    start: new Date(2022, 9, 1, 2, 37),
    end: new Date(2022, 9, 1, 3, 37),
    title: "test1"
}

const eventEndsbeforeStart: CalendarEvent = {
    id: "458",
    start: new Date(2023, 2, 1, 9, 0),
    end:new Date(2023, 2, 1, 8, 0),
    title: "test2"
}

const eventEndsAfterStartOfAnotherEvent: CalendarEvent = {
    id: "458",
    start: new Date(2023, 8, 22, 7, 0),
    end: new Date(2023, 8, 22, 8, 30),
    title: "eventEndsAfterStartOfAnotherEvent"
}

const eventStartAfterStartOfAnotherEventAndEndAfterEnds: CalendarEvent = {
    id: "458",
    start: new Date(2023, 8, 22, 8, 30),
    end: new Date(2023, 8, 22, 9, 15),
    title: "eventEndsAfterStartOfAnotherEvent"
}

const eventDuringOverAnother: CalendarEvent = {
    id: "458",
    start: new Date(2023, 8, 22, 4, 30),
    end: new Date(2023, 8, 22, 11, 15),
    title: "eventDuringOverAnother"
}

const eventStartAndEndsDuringAnother: CalendarEvent = {
    id: "458",
    start: new Date(2023, 8, 22, 8, 30),
    end: new Date(2023, 8, 22, 8, 55),
    title: "eventStartAndEndsDuringAnother"
}

const correctEvent: CalendarEvent ={
    id: "854",
    start: new Date(2023, 5, 7, 10, 0),
    end: new Date(2023, 5, 7, 11, 0),
    title: "cool event"
}


describe("CalendarPolicies", ()=>{
    let policies: CalendarPolicies;

    beforeEach(()=>{
        policies = new CalendarPolicies(new CalendarFakeRepository());
    })

    it('should verify if the event is in past', async ()=> {
        const resultCommand = await policies.applySaveCalendarEventPolicies(eventStartInPast, dateProvider());
        expect(resultCommand.getPayload()).toEqual("event start must be in the futur");
    })

    it('should verify that the end is before the start', async ()=>{
        const resultCommand = await policies.applySaveCalendarEventPolicies(eventEndsbeforeStart, dateProvider());
        expect(resultCommand.getPayload()).toEqual("end of the event must be after his start");
    });

    it('should make sure that the event does not ends during another', async ()=>{
        const resultCommand = await policies.applySaveCalendarEventPolicies(eventEndsAfterStartOfAnotherEvent, dateProvider());
        expect(resultCommand.getPayload()).toEqual("cannot have two event at the same time");
    });

    it('should make sure that the event does not start during another', async ()=>{
        const resultCommand = await policies.applySaveCalendarEventPolicies(eventStartAfterStartOfAnotherEventAndEndAfterEnds, dateProvider());
        expect(resultCommand.getPayload()).toEqual("cannot have two event at the same time");
    })

    it('should make sure that the event does not during over another', async ()=>{
        const resultCommand = await policies.applySaveCalendarEventPolicies(eventDuringOverAnother , dateProvider());
        expect(resultCommand.getPayload()).toEqual("cannot have two event at the same time");
    })

    it('should make sure that the event does not start ans ends during another', async ()=>{
        const resultCommand = await policies.applySaveCalendarEventPolicies(eventStartAndEndsDuringAnother , dateProvider());
        expect(resultCommand.getPayload()).toEqual("cannot have two event at the same time");
    })

    it('should pass the test', async ()=>{
        const resultCommand = await policies.applySaveCalendarEventPolicies(correctEvent , dateProvider());
        expect(resultCommand).toBeInstanceOf(AddCalendarEventCommand)
    })
})