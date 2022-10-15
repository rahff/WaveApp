import { ICalendarEvent } from "src/infra/models/ICalendarEvent";
import { IBaseState } from "./IBaseState";



export interface ICalendarState extends IBaseState {
    events: ICalendarEvent[];
    onSuccessSave: boolean
}