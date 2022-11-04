import { CalendarNotification } from "./CalendarNotification"



describe('CalendarNotification', ()=>{
    let calendarNotification: CalendarNotification;
    
    it("should have correct notification date time in regard to start time event reference", ()=> {
        calendarNotification = new CalendarNotification("1:00", new Date(2022, 10, 25, 10, 15), "title");
        expect(calendarNotification.getNotificationDateTime()).toEqual(new Date(2022, 10, 25, 9, 15));
        calendarNotification = new CalendarNotification("0:05", new Date(2022, 10, 25, 10, 15), "title");
        expect(calendarNotification.getNotificationDateTime()).toEqual(new Date(2022, 10, 25, 10, 10));
        calendarNotification = new CalendarNotification("0:45", new Date(2022, 10, 25, 10, 15), "title");
        expect(calendarNotification.getNotificationDateTime()).toEqual(new Date(2022, 10, 25, 9, 30));
        calendarNotification = new CalendarNotification("1:15", new Date(2022, 10, 25, 10, 15), "title");
        expect(calendarNotification.getNotificationDateTime()).toEqual(new Date(2022, 10, 25, 9, 0));
        calendarNotification = new CalendarNotification("48:00", new Date(2022, 10, 25, 10, 15), "title");
        expect(calendarNotification.getNotificationDateTime()).toEqual(new Date(2022, 10, 23, 10, 15));
        calendarNotification = new CalendarNotification("48:00", new Date(2023, 0, 1, 10, 0), "title");
        expect(calendarNotification.getNotificationDateTime()).toEqual(new Date(2022, 11, 30, 10, 0));
    })
})