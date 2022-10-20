import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { fakeAsync, TestBed } from "@angular/core/testing";
import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { DatabaseModule } from "../modules/database.module";
import { CalendarRepositoryAdapter } from "./CalendarRepositoryAdapter";

const ref = new CalendarEvent("test event", new Date(2022, 8, 5, 5, 0), new Date(2022, 8, 5, 8, 0), "147");

describe('CalendarRepositoryAdapter', ()=> {

    let repository: CalendarRepositoryAdapter;
    let http: HttpTestingController
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [
                DatabaseModule,
                HttpClientTestingModule
            ]
        })
        repository = TestBed.inject(CalendarRepositoryAdapter);
        http = TestBed.inject(HttpTestingController);
    })

    it('should be created', ()=> {
        expect(repository).toBeTruthy();
    })

    it('should save a new calendar event', async()=> {
        const savedEvent = await repository.saveCalendarEvent(ref.asDto());
        expect(savedEvent.title).toBe("test event");
    });

    it('should send post request to save notification endpoint', fakeAsync(async()=>{
        ref.setNotification({notificationTime: "1:00", notificationDateTime: new Date()})
        const savedEvent = await repository.saveCalendarEvent(ref.asDto());
        const req = http.expectOne("http://localhost:8080/api/notifications");
        expect(req.request.method).toBe("POST")
        expect(req.request.body).toEqual(ref.asDto().notification)
        req.flush(ref.asDto())
    }))

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