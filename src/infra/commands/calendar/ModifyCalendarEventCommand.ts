import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { Command } from "src/shared/command/Command";

export class ModifyCalendarEventCommand extends Command {
    constructor(payload: Partial<CalendarEvent>) {
        super("modifyEvent", payload);
    }
}