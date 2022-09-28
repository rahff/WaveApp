import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { Command } from "src/shared/command/Command";

export class SaveCalendarEventCommand extends Command {
    constructor(payload: CalendarEvent) {
        super("saveEvent", payload);
    }
}