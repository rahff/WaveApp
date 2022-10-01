import { Command } from "src/shared/command/Command";
import { UpdateCalendarEventCommand } from "../commands/calendar/UpdateCalendarEventCommand";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../interfaces/EffectCreator";
import { CalendarPolicies } from "../policies/CalendarPolicies";
import { CalendarRepository } from "../ports/driven/CalendarRepository";

export class CalendarEffect implements EffectCreator {

    private validationPolicy: CalendarPolicies;

    constructor(private repository: CalendarRepository){
        this.validationPolicy = new CalendarPolicies(this.repository);
    }
    
    async createEffect(command: Command): Promise<Command> {
        switch (command.getName()) {
            case "getEvents":
                return await this.validationPolicy.getCalendarEvents();
            case "saveEvent":
                return await this.validationPolicy.saveCalendarEvent(command.getPayload());
            case "deleteEvent":
                return await this.validationPolicy.deleteCalendarEvent(command.getPayload());
            case "modifyEvent":
                return await this.validationPolicy.modifyCalendarEvent(command.getPayload());
            default: throw new CommandNotFoundException();
        }
    }

}