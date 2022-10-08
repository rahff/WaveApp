
import { ErrorEvent } from "../events/shared/ErrorEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../ports/driver/EffectCreator";
import { CalendarPolicies } from "../policies/CalendarPolicies";
import { CalendarRepository } from "../ports/driven/CalendarRepository";
import { Action } from "src/shared/actions/Action";



export class CalendarEffect implements EffectCreator {

    private validationPolicy: CalendarPolicies;

    constructor(private repository: CalendarRepository){
        this.validationPolicy = new CalendarPolicies(this.repository);
    }
    
    async createEffect(command: Action): Promise<Action> {
        switch (command.getName()) {
            case "getEvents":
                try {
                    return await this.validationPolicy.applyGetCalendarEventsPolicies();
                } catch (error: any) {
                    return new ErrorEvent(error.message);
                }
            case "saveEvent":
                try {
                    return await this.validationPolicy.applySaveCalendarEventPolicies(command.getPayload());
                } catch (error: any) {
                    return new ErrorEvent(error.message);
                }
            case "deleteEvent":
                try {
                    return await this.validationPolicy.applyDeleteCalendarEventPolicies(command.getPayload());
                } catch (error: any) {
                    return new ErrorEvent(error.message);
                }
            case "modifyEvent":
                try {
                    return await this.validationPolicy.applyModifyCalendarEventPolicies(command.getPayload());
                } catch (error: any) {
                    return new ErrorEvent(error.message);
                }
                
            default: throw new CommandNotFoundException();
        }
    }

}