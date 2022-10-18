import { ICalendarNotification } from "./ICalendarNotification";

export interface ICalendarEvent {
    id: string;
    start: Date;
    end: Date;
    title: string;
    notification: ICalendarNotification | null
}
