import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICalendarEvent } from "src/infra/models/ICalendarEvent";
import { CalendarModule } from "src/infra/modules/calendar.module";
import { CalendarDispatcherService } from "src/infra/services/calendar/calendar-dispatcher.service";
import { CalendarSelectorService } from "src/infra/services/calendar/calendar-selector.service";
import { Facade } from "src/shared/abstract/Facade";


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
}