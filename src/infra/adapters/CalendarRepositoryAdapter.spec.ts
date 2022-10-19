import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { DatabaseModule } from "../modules/database.module";
import { CalendarRepositoryAdapter } from "./CalendarRepositoryAdapter";

const ref = new CalendarEvent("test event", new Date(2022, 8, 5, 5, 0), new Date(2022, 8, 5, 8, 0), "147");

describe('CalendarRepositoryAdapter', ()=> {

    let repository: CalendarRepositoryAdapter;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [
                DatabaseModule,
                HttpClientTestingModule
            ]
        })
        repository = TestBed.inject(CalendarRepositoryAdapter);
    })

    it('should be created', ()=> {
        expect(repository).toBeTruthy();
    })

    it('should save a new calendar event', async()=> {
        const savedEvent = await repository.saveCalendarEvent(ref.asDto());
        expect(savedEvent.title).toBe("test event");
    });

    it('should save an event and notification', async ()=>{
        //**************TODO*******************//
        expect("hello").toBeTruthy();
    })

    it('should get All events', async()=> {
        const savedEvent = await repository.saveCalendarEvent(ref.asDto());
        const eventList = await repository.getCalendarEvents();
        expect(eventList).toContain(savedEvent);
    })

    it('should delete an event', async()=> {
        const savedRef = await repository.saveCalendarEvent({...ref.asDto(), title: "rrr"});
        const deltedId = await repository.deleteCalendarEvent(savedRef.id);
        expect(deltedId).toEqual(savedRef.id);
    });

    it('should modify an event', async ()=>{
        const savedRef = await repository.saveCalendarEvent({...ref.asDto(), title: "to modify"});
        const updatedRef = await repository.modifyCalendarEvent({...savedRef, start: new Date(2022, 8, 5, 6, 0), title: "modified"});
        expect(updatedRef.start).toEqual(new Date(2022, 8, 5, 6, 0));
        expect(updatedRef.title).toEqual("modified");
    })
})