import { Command } from "src/shared/command/Command";
import { CalendarEvent } from "../entities/CalendarEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { Reducer } from "../interfaces/Reducer";
import { CalendarState } from "../interfaces/states/CalendarState";



export class CalendarStateReducer implements Reducer {

    reduceState(initialState: CalendarState, command: Command): CalendarState {
        switch (command.getName()) {
            case "setEvents":
                return {
                    ...initialState,
                    events: command.getPayload()
                }
            case "addEvent":
                return {
                    ...initialState,
                    events: [...initialState.events, command.getPayload()]
                } 
            case "removeEvent":
                return {
                    ...initialState,
                    events: this.removeEvent(initialState.events, command.getPayload())
                } 
            default: throw new CommandNotFoundException();
        }
    }

    private removeEvent(list: CalendarEvent[], eventId: string): CalendarEvent[] {
       return list.filter((event: CalendarEvent) => event.getId() !== eventId);
    }
}