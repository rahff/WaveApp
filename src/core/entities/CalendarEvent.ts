import { ICalendarEvent } from "src/infra/models/ICalendarEvent";
import { ICalendarNotification } from "src/infra/models/ICalendarNotification";
import { CalendarNotification } from "../valueObjects/CalendarNotification";



export class CalendarEvent {

    private notification: CalendarNotification | null = null;

    constructor(private title: string, private start: Date, private end: Date, private id: string){
        this.checkEndValidity();
    }

    private checkEndValidity(): void {
        if(this.end < this.start) throw new Error("end of the event must be after his start");
    }

    public setStart(start: Date): void {
        this.start = start;
    };

    public setEnd(end: Date): void {
        this.end = end;
        this.checkEndValidity();
    };

    public setTitle(title: string): void {
        this.title = title;
    };

    public getTitle(): string {
        return this.title;
    }

    public getStart(): Date {
        return this.start;
    }

    public getEnd(): Date {
        return this.end;
    }

    public getId(): string {
        return this.id;
    }

    public asDto(): ICalendarEvent {
        return {
            title: this.title,
            start: this.start,
            end: this.end,
            id: this.id,
            notification: this.notification ? this.notification.asDto() : null
        }
    }

    public setNotification(notification: ICalendarNotification){
        this.notification = new CalendarNotification(notification.notificationTime, this.getStart());
    }

    public getNotification(): CalendarNotification | null {
        return this.notification;
    }
}