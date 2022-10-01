import { CalendarFakeRepository } from "src/infra/mocks/CalendarFakeRepository";
import { CalendarEvent } from "../entities/CalendarEvent";
import { CalendarPolicies } from "./CalendarPolicies"


const dateProvider = ()=> new Date(2022, 9, 1, 2, 38);
const eventStartInPast: CalendarEvent = {
    id: "458",
    start: {
        year: 2022, month: 9, day: 1, hour: 2, minute: 37
    },
    end: {
        year: 2022, month: 9, day: 1, hour: 1, minute: 0
    },
    title: "test1"
}

const eventEndsbeforeStart: CalendarEvent = {
    id: "458",
    start: {
        year: 2023, month: 2, day: 1, hour: 9, minute: 0
    },
    end: {
        year: 2023, month: 2, day: 1, hour: 8, minute: 0
    },
    title: "test2"
}

const eventEndsAfterStartOfAnotherEvent: CalendarEvent = {
    id: "458",
    start: {
        year: 2023, month: 8, day: 22, hour: 7, minute: 0
    },
    end: {
        year: 2023, month: 8, day: 22, hour: 8, minute: 30
    },
    title: "eventEndsAfterStartOfAnotherEvent"
}

const eventStartAfterStartOfAnotherEventAndEndAfterEnds: CalendarEvent = {
    id: "458",
    start: {
        year: 2023, month: 8, day: 22, hour: 8, minute: 30
    },
    end: {
        year: 2023, month: 8, day: 22, hour: 9, minute: 15
    },
    title: "eventEndsAfterStartOfAnotherEvent"
}

const eventDuringOverAnother: CalendarEvent = {
    id: "458",
    start: {
        year: 2023, month: 8, day: 22, hour: 4, minute: 30
    },
    end: {
        year: 2023, month: 8, day: 22, hour: 11, minute: 15
    },
    title: "eventDuringOverAnother"
}

const eventStartAndEndsDuringAnother: CalendarEvent = {
    id: "458",
    start: {
        year: 2023, month: 8, day: 22, hour: 8, minute: 30
    },
    end: {
        year: 2023, month: 8, day: 22, hour: 8, minute: 55
    },
    title: "eventStartAndEndsDuringAnother"
}


describe("CalendarPolicies", ()=>{
    let policies: CalendarPolicies;

    beforeEach(()=>{
        policies = new CalendarPolicies(new CalendarFakeRepository());
    })

    it('should verify if the event is in past', async ()=> {
        const resultCommand = await policies.saveCalendarEvent(eventStartInPast, dateProvider());
        expect(resultCommand.getPayload()).toEqual("event start must be in the futur");
    })

    it('should verify that the end is before the start', async ()=>{
        const resultCommand = await policies.saveCalendarEvent(eventEndsbeforeStart, dateProvider());
        expect(resultCommand.getPayload()).toEqual("end of the event must be after his start");
    });

    it('should make sure that the event does not ends during another', async ()=>{
        const resultCommand = await policies.saveCalendarEvent(eventEndsAfterStartOfAnotherEvent, dateProvider());
        expect(resultCommand.getPayload()).toEqual("cannot have two event at the same time");
    });

    it('should make sure that the event does not start during another', async ()=>{
        const resultCommand = await policies.saveCalendarEvent(eventStartAfterStartOfAnotherEventAndEndAfterEnds, dateProvider());
        expect(resultCommand.getPayload()).toEqual("cannot have two event at the same time");
    })

    it('should make sure that the event does not during over another', async ()=>{
        const resultCommand = await policies.saveCalendarEvent(eventDuringOverAnother , dateProvider());
        expect(resultCommand.getPayload()).toEqual("cannot have two event at the same time");
    })

    it('should make sure that the event does not start ans ends during another', async ()=>{
        const resultCommand = await policies.saveCalendarEvent(eventStartAndEndsDuringAnother , dateProvider());
        expect(resultCommand.getPayload()).toEqual("cannot have two event at the same time");
    })
})