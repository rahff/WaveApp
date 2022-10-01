import { CalendarEvent } from "src/core/entities/CalendarEvent";
import { BaseState } from "./BaseState";

export interface CalendarState extends BaseState{
    events: CalendarEvent[]
}