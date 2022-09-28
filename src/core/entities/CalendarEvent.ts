export type Time = {hour: number, minute: number};

export class CalendarEvent {

    constructor(private id: string, private eventDate: Date, private eventTime: Time, private title: string){}

    getEventDate(): Date {
        return this.eventDate;
    }

    getEventTime(): Time {
        return this.eventTime;
    }

    getTitle(): string {
        return this.title;
    }

    getId(): string {
        return this.id;
    }
}