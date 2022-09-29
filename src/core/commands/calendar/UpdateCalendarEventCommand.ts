import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { Command } from "src/shared/command/Command";

export class UpdateCalendarEventCommand extends Command {
    constructor(payload: CalendarEvent) {
        super("updateEvent", payload);
    }
}