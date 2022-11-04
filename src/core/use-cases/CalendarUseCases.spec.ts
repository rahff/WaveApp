
import { CalendarFakeRepository } from "../../infra/mocks/CalendarFakeRepository";
import { AddCalendarEventCommand } from "../commands/calendar/AddCalendarEventCommand";
import { CalendarEvent } from "../entities/CalendarEvent";
import { CalendarUseCases } from "./CalendarUseCases"


const dateProvider = ()=> new Date(2022, 9, 1, 2, 38);
const eventStartInPast = new CalendarEvent("test1", new Date(2022, 9, 1, 2, 37), new Date(2022, 9, 1, 3, 37), "123");

const eventEndsAfterStartOfAnotherEvent = new CalendarEvent("eventEndsAfterStartOfAnotherEvent", new Date(2023, 8, 22, 7, 0), new Date(2023, 8, 22, 8, 30), "456");

const eventStartAfterStartOfAnotherEventAndEndAfterEnds = new CalendarEvent("eventEndsAfterStartOfAnotherEvent", new Date(2023, 8, 22, 8, 30), new Date(2023, 8, 22, 9, 15), "789");

const eventDuringOverAnother = new CalendarEvent("eventDuringOverAnother", new Date(2023, 8, 22, 4, 30), new Date(2023, 8, 22, 11, 15), "987") 

const eventStartAndEndsDuringAnother = new CalendarEvent("eventStartAndEndsDuringAnother", new Date(2023, 8, 22, 8, 30), new Date(2023, 8, 22, 8, 55), "654");

const correctEvent = new CalendarEvent("cool event", new Date(2023, 5, 7, 10, 0), new Date(2023, 5, 7, 11, 0), "321");


describe("CalendarUseCases", ()=>{
    let policies: CalendarUseCases;

    beforeEach(()=>{
        policies = new CalendarUseCases(new CalendarFakeRepository());
    })

    it('should verify if the event is in past', async ()=> {
        const resultCommand = await policies.applySaveCalendarEvent(eventStartInPast.asDto(), dateProvider());
        expect(resultCommand.getPayload()).toEqual("event start must be in the futur");
    })

    it('should verify that the end is before the start', async ()=>{
        const resultCommand = await policies.applySaveCalendarEvent({id: "987", title: "endBefore", notification: null, start: new Date(2022, 10, 6, 8, 0), end: new Date(2022, 10, 5, 9, 0)}, dateProvider());
        expect(resultCommand.getPayload()).toEqual("end of the event must be after his start");
    });

    it('should make sure that the event does not ends during another', async ()=>{
        const resultCommand = await policies.applySaveCalendarEvent(eventEndsAfterStartOfAnotherEvent.asDto(), dateProvider());
        expect(resultCommand.getPayload()).toEqual("cannot have two event at the same time");
    });

    it('should make sure that the event does not start during another', async ()=>{
        const resultCommand = await policies.applySaveCalendarEvent(eventStartAfterStartOfAnotherEventAndEndAfterEnds.asDto(), dateProvider());
        expect(resultCommand.getPayload()).toEqual("cannot have two event at the same time");
    })

    it('should make sure that the event does not during over another', async ()=>{
        const resultCommand = await policies.applySaveCalendarEvent(eventDuringOverAnother.asDto(), dateProvider());
        expect(resultCommand.getPayload()).toEqual("cannot have two event at the same time");
    })

    it('should make sure that the event does not start ans ends during another', async ()=>{
        const resultCommand = await policies.applySaveCalendarEvent(eventStartAndEndsDuringAnother.asDto(), dateProvider());
        expect(resultCommand.getPayload()).toEqual("cannot have two event at the same time");
    })

    it('should pass the test', async ()=>{
        const resultCommand = await policies.applySaveCalendarEvent(correctEvent.asDto(), dateProvider());
        expect(resultCommand).toBeInstanceOf(AddCalendarEventCommand);
    })
})