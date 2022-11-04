
import { CalendarEvent } from "../../entities/CalendarEvent";
import { BaseState } from "./BaseState";

export interface CalendarState extends BaseState{
    events: CalendarEvent[];
    onSuccessSave: boolean;
}