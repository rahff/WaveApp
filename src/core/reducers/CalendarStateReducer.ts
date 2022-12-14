
import { Action } from "../../shared/actions/Action";
import { CalendarEvent } from "../entities/CalendarEvent";
import { CommandNotFoundException } from "../exceptions/CommandNotFoundException";
import { Reducer } from "../interfaces/Reducer";
import { CalendarState } from "../interfaces/states/CalendarState";



export class CalendarStateReducer implements Reducer {

    reduceState(initialState: CalendarState, command: Action): CalendarState {
        switch (command.getName()) {
            case "setEvents":
                return {
                    ...initialState,
                    events: command.getPayload()
                };

            case "addEvent":
                return {
                    ...initialState,
                    events: [...initialState.events, command.getPayload()],
                    onSuccessSave: true
                };

            case "removeEvent":
                return {
                    ...initialState,
                    events: this.removeEvent(initialState.events, command.getPayload())
                };

            case "updateEvent":
                return {
                    ...initialState,
                    events: this.updateEvent(initialState.events, command.getPayload()),
                    onSuccessSave: true
                };

            case "onException": 
                return {
                    ...initialState,
                    onException: {message: command.getPayload()}
                };

            case "exceptionHandled": 
                return {
                    ...initialState,
                    onException: command.getPayload()
                };

            case "eventSaved":
                return {
                    ...initialState,
                    onSuccessSave: false
                }

            default: throw new CommandNotFoundException();
        }
    }

    private updateEvent(list: CalendarEvent[], updatedEvent: CalendarEvent): CalendarEvent[] {
        return list.map((event: CalendarEvent)=> {
            if(event.getId() === updatedEvent.getId()) event = updatedEvent
            return event;
        })
    }

    private removeEvent(list: CalendarEvent[], eventId: string): CalendarEvent[] {
       return list.filter((event: CalendarEvent) => event.getId() !== eventId);
    }
}