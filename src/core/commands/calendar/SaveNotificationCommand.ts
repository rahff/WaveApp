import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { CalendarNotification } from "src/core/valueObjects/CalendarNotification";
import { Command } from "src/shared/actions/Action";



export interface NotificationTransaction {event: CalendarEvent, notification: CalendarNotification};

export class SaveNotificationCommand extends Command {
    constructor(payload: NotificationTransaction){
        super("saveNotification", payload);
    }
}