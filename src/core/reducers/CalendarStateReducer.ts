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
                };

            case "addEvent":
                return {
                    ...initialState,
                    events: [...initialState.events, command.getPayload()]
                };

            case "removeEvent":
                return {
                    ...initialState,
                    events: this.removeEvent(initialState.events, command.getPayload())
                };

            case "updateEvent":
                return {
                    ...initialState,
                    events: this.updateEvent(initialState.events, command.getPayload())
                };

            case "invalidEventRegistration":
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                };

            case "onError": 
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                };

            case "exceptionThrowed": 
                return {
                    ...initialState,
                    onException: command.getPayload()
                };
                

            default: throw new CommandNotFoundException();
        }
    }

    private updateEvent(list: CalendarEvent[], updatedEvent: CalendarEvent): CalendarEvent[] {
        return list.map((event: CalendarEvent)=> {
            if(event.id === updatedEvent.id) event = updatedEvent
            return event;
        })
    }

    private removeEvent(list: CalendarEvent[], eventId: string): CalendarEvent[] {
       return list.filter((event: CalendarEvent) => event.id !== eventId);
    }
}