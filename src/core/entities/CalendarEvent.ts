export type Time = {hour: number, minute: number};

export interface CalendarEvent {
    id: string;
    eventDate: Date;
    eventTime: Time;
    title: string;
}