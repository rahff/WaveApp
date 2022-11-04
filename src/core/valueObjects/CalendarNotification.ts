
import { ICalendarNotification } from "../../infra/models/ICalendarNotification";
import { TimeString } from "./TimeString";


export class CalendarNotification {
    
    private notificationDateTime: Date | null = null;
    private timeString: TimeString;

    constructor(notificationString: string, private startDateTimeRef: Date, private eventTitle: string){
        this.timeString = new TimeString(notificationString);
        this.setNotificationDateTime();
    }

    private setNotificationDateTime(): void {
        const subtractedHours = this.timeString.getHours();
        const subtractedMinutes = this.timeString.getMinutes();
        const dateTimeNotification = new Date(this.startDateTimeRef.toDateString());
        dateTimeNotification.setHours(this.startDateTimeRef.getHours() - subtractedHours);
        dateTimeNotification.setMinutes(this.startDateTimeRef.getMinutes() - subtractedMinutes);
        this.notificationDateTime = dateTimeNotification;
    }

    public getNotificationDateTime(): Date | null {
        return this.notificationDateTime;
    }

    public asDto(): ICalendarNotification {
        return {
            notificationTime: this.timeString.getValue(),
            notificationDateTime: this.notificationDateTime,
            eventStart: this.startDateTimeRef,
            eventTitle: this.eventTitle
        }
    }

}