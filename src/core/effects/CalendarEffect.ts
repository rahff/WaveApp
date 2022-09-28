import { Command } from "src/shared/command/Command";
import { AddCalendarEventCommand } from "../commands/calendar/AddCalendarEventCommand";
import { RemoveCalendarEventCommand } from "../commands/calendar/RemoveCalendarEventCommand";
import { SetEventListCommand } from "../commands/calendar/SetEventListCommand";
import { CalendarEvent } from "../entities/CalendarEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../interfaces/EffectCreator";
import { CalendarRepository } from "../ports/driven/CalendarRepository";

export class CalendarEffect implements EffectCreator {

    constructor(private repository: CalendarRepository){}
    
    async createEffect(command: Command): Promise<Command> {
        switch (command.getName()) {
            case "getEvents":
                const events = await this.repository.getCalendarEvents();
                return new SetEventListCommand(events);
            case "saveEvent":
                const savedEvent = await this.repository.saveCalendarEvent(command.getPayload());
                return new AddCalendarEventCommand(savedEvent);
            case "deleteEvent":
                const deletedId = await this.repository.deleteCalendarEvent(command.getPayload());
                return new RemoveCalendarEventCommand(deletedId);
            default: throw new CommandNotFoundException();
        }
    }

}