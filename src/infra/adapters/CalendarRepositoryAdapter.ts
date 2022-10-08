import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { catchError, firstValueFrom, map, Observable, of } from "rxjs";
import { CalendarRepository } from "src/core/ports/driven/CalendarRepository";
import { ICalendarEvent } from "../models/ICalendarEvent";
import { DatabaseModule } from "../modules/database.module";
import { generateId } from "../utils/generators";



@Injectable({
    providedIn: DatabaseModule
})
export class CalendarRepositoryAdapter implements CalendarRepository{

    constructor(private service: NgxIndexedDBService){}

    async getCalendarEvents(): Promise<ICalendarEvent[]> {
        return firstValueFrom(this.service.getAll<ICalendarEvent>("calendar")
        .pipe(catchError(()=> {throw new Error("something goes wrong")})), 
        {defaultValue: []});
    }

    async saveCalendarEvent(calendarEvent: ICalendarEvent): Promise<ICalendarEvent> {
        calendarEvent.id = generateId();
        return await firstValueFrom(this.service.add("calendar", calendarEvent)
        .pipe(catchError(()=> {throw new Error("failed to save")})));
    }

    async deleteCalendarEvent(calendarEventId: string): Promise<string> {
        const isDeleted = await firstValueFrom(this.performDeletion(calendarEventId), {defaultValue: false});
        if(isDeleted) return calendarEventId;
        return "";
    }

    private performDeletion(id: string): Observable<boolean> {
        return this.service.delete("calendar", id)
        .pipe(map(()=> true), catchError(()=> of(false)));
    }

    async modifyCalendarEvent(updated: ICalendarEvent): Promise<ICalendarEvent> {
        return await firstValueFrom(this.service.update("calendar", updated)
        .pipe(catchError(()=> {throw new Error("failed to update")})));
    }
}