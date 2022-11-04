import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Facade } from "../../../shared/abstract/Facade";
import { ICalendarEvent } from "../../models/ICalendarEvent";
import { CalendarModule } from "../../modules/calendar.module";
import { CalendarDispatcherService } from "./calendar-dispatcher.service";
import { CalendarSelectorService } from "./calendar-selector.service";


@Injectable({
    providedIn: CalendarModule
})
export class CalendarFacade extends Facade<CalendarSelectorService> {

    constructor(dispatcher: CalendarDispatcherService){
        super(dispatcher);
    }

    public getCalendarEvent(): Observable<ICalendarEvent[]> {
        return this.dispatcher.stateSelector.getCalendarEvents();
    }

    public getOnSuccessEvent(): Observable<boolean> {
        return this.dispatcher.stateSelector.getOnSuccessSaveEvent();
    }
}