import { TestBed } from "@angular/core/testing";
import { DatabaseModule } from "../modules/database.module";
import { CalendarRepositoryAdapter } from "./CalendarRepositoryAdapter";

const ref = {id: "133", title: "test event", start: new Date(2022, 8, 5, 5, 0), end: new Date(2022, 8, 5, 8, 0)}

describe('CalendarRepositoryAdapter', ()=> {

    let repository: CalendarRepositoryAdapter;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [
                DatabaseModule
            ]
        })
        repository = TestBed.inject(CalendarRepositoryAdapter);
    })

    it('should be created', ()=> {
        expect(repository).toBeTruthy();
    })

    it('should save a new calendar event', async()=> {
        const savedEvent = await repository.saveCalendarEvent(ref);
        expect(savedEvent.title).toBe("test event");
    });

    it('should get All events', async()=> {
        const savedEvent = await repository.saveCalendarEvent(ref);
        const eventList = await repository.getCalendarEvents();
        expect(eventList).toContain(savedEvent);
    })

    it('should delete an event', async()=> {
        const savedRef = await repository.saveCalendarEvent({...ref, title: "rrr"});
        const deltedId = await repository.deleteCalendarEvent(savedRef.id);
        expect(deltedId).toEqual(savedRef.id);
    });

    it('should modify an event', async ()=>{
        const savedRef = await repository.saveCalendarEvent({...ref, title: "to modify"});
        const updatedRef = await repository.modifyCalendarEvent({...savedRef, start: new Date(2022, 8, 5, 6, 0), title: "modified"});
        expect(updatedRef.start).toEqual(new Date(2022, 8, 5, 6, 0));
        expect(updatedRef.title).toEqual("modified");
    })
})