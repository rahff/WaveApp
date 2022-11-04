export interface ICalendarNotification {
    notificationTime: string;
    notificationDateTime: Date | null;
    eventStart: Date;
    eventTitle: string;
}