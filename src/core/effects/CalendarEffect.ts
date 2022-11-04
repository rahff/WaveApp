
import { ExceptionEvent } from "../events/shared/ExceptionEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { EffectCreator } from "../ports/driver/EffectCreator";
import { CalendarUseCases } from "../use-cases/CalendarUseCases";
import { CalendarRepository } from "../ports/driven/CalendarRepository";
import { Action } from "../../shared/actions/Action";



export class CalendarEffect implements EffectCreator {

    private calendarUseCases: CalendarUseCases;

    constructor(private repository: CalendarRepository){
        this.calendarUseCases = new CalendarUseCases(this.repository);
    }
    
    async createEffect(command: Action): Promise<Action> {
        switch (command.getName()) {
            case "getEvents":
                try {
                    return await this.calendarUseCases.applyGetCalendarEvents();
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "saveEvent":
                try {
                    return await this.calendarUseCases.applySaveCalendarEvent(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "deleteEvent":
                try {
                    return await this.calendarUseCases.applyDeleteCalendarEvent(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
            case "modifyEvent":
                try {
                    return await this.calendarUseCases.applyModifyCalendarEvent(command.getPayload());
                } catch (error: any) {
                    return new ExceptionEvent(error.message);
                }
                
            default: throw new CommandNotFoundException();
        }
    }

}