import { Command } from "src/shared/command/Command";
import { UnknownErrorEvent } from "../events/shared/UnknownErrorEvent";
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
                try {
                    return await this.validationPolicy.applyGetCalendarEventsPolicies();
                } catch (error: any) {
                    return new UnknownErrorEvent(error.message);
                }
            case "saveEvent":
                try {
                    return await this.validationPolicy.applySaveCalendarEventPolicies(command.getPayload());
                } catch (error: any) {
                    return new UnknownErrorEvent(error.message);
                }
            case "deleteEvent":
                try {
                    return await this.validationPolicy.applyDeleteCalendarEventPolicies(command.getPayload());
                } catch (error: any) {
                    return new UnknownErrorEvent(error.message);
                }
            case "modifyEvent":
                try {
                    return await this.validationPolicy.applyModifyCalendarEventPolicies(command.getPayload());
                } catch (error: any) {
                    return new UnknownErrorEvent(error.message);
                }
                
            default: throw new CommandNotFoundException();
        }
    }

}